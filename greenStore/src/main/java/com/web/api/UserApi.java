package com.web.api;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.web.dto.request.LoginDto;
import com.web.dto.request.PasswordDto;
import com.web.dto.request.TokenDto;
import com.web.dto.request.UserRequest;
import com.web.dto.response.Message;
import com.web.dto.response.UserDto;
import com.web.entity.Authority;
import com.web.entity.User;
import com.web.exception.MessageException;
import com.web.jwt.JwtTokenProvider;
import com.web.mapper.UserMapper;
import com.web.repository.AuthorityRepository;
import com.web.repository.UserRepository;
import com.web.service.GoogleOAuth2Service;
import com.web.service.UserService;
import com.web.utils.CloudinaryService;
import com.web.utils.MailService;
import com.web.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserApi {

    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final UserUtils userUtils;

    private final MailService mailService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    public UserApi(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, UserUtils userUtils, MailService mailService) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userUtils = userUtils;
        this.mailService = mailService;
    }

    @Autowired
    private GoogleOAuth2Service googleOAuth2Service;

    @PostMapping("/login/google")
    public ResponseEntity<?> loginWithGoogle(@RequestBody String credential) throws Exception {
        GoogleIdToken.Payload payload = googleOAuth2Service.verifyToken(credential);
        if(payload == null){
            throw new MessageException("Đăng nhập thất bại");
        }
        TokenDto tokenDto = userService.loginWithGoogle(payload);
        return new ResponseEntity(tokenDto, HttpStatus.OK);
    }

    /*token device get from firebase*/
    @PostMapping("/login")
    public TokenDto authenticate(@RequestBody LoginDto loginDto) throws Exception {
        TokenDto tokenDto = userService.login(loginDto.getUsername(), loginDto.getPassword());
        return tokenDto;
    }

    @PostMapping("/regis")
    public ResponseEntity<?> regisUser(@RequestBody UserRequest userRequest) throws URISyntaxException {
        User user = userMapper.userRequestToUser(userRequest);
        UserDto result= userMapper.userToUserDto(userService.regisUser(user));
        return ResponseEntity
                .created(new URI("/api/register-user/" + user.getUsername()))
                .body(result);
    }

    @PostMapping("/active-account")
    public ResponseEntity<?> activeAccount(@RequestParam String email, @RequestParam String key) throws URISyntaxException {
        userService.activeAccount(key, email);
        return new ResponseEntity<>("kích hoạt thành công", HttpStatus.OK);
    }

    @PostMapping("/user/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordDto passwordDto){
        userService.changePass(passwordDto.getOldPass(), passwordDto.getNewPass());
        return new ResponseEntity<>(new Message("Success"), HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> changePassword(@RequestParam String email){
        userService.forgotPassword(email);
        return new ResponseEntity<>(new Message("Success"), HttpStatus.OK);
    }

    @GetMapping("/admin/get-user-by-role")
    public ResponseEntity<?> getUserByRole(@RequestParam(value = "role", required = false) String role){
        List<User> list = new ArrayList<>();
        if(role != null){
            list = userRepository.getUserByRole(role);
        }
        else{
            list = userRepository.findAll();
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    @GetMapping("/admin/check-role-admin")
    public void checkRoleAdmin(){
        System.out.println("admin");
    }

    @GetMapping("/user/check-role-user")
    public void checkRoleUser(){
        System.out.println("user");
    }

    @GetMapping("/employee/check-role-employee")
    public void checkRoleEmployee(){
        System.out.println("employee");
    }

    @PostMapping("/admin/lockOrUnlockUser")
    public void activeOrUnactiveUser(@RequestParam("id") Long id){
        User user = userRepository.findById(id).get();
        if(user.getActived() == true){
            user.setActived(false);
            userRepository.save(user);
            return;
        }
        else{
            user.setActived(true);
            userRepository.save(user);
        }
    }

    @PostMapping("/admin/addaccount")
    public ResponseEntity<?> addaccount(@RequestBody UserRequest userRequest) throws URISyntaxException {
        User user = userMapper.userRequestToUser(userRequest);
        Authority authority = authorityRepository.findById(userRequest.getAuthorities().getName()).get();
        user.setAuthorities(authority);
        UserDto result= userMapper.userToUserDto(userService.addAccount(user));
        return ResponseEntity
                .created(new URI("/api/register-user/" + user.getUsername()))
                .body(result);
    }

    @PostMapping("/public/quen-mat-khau")
    public ResponseEntity<?> quenMatKhau(@RequestParam String email) throws URISyntaxException {
        userService.guiYeuCauQuenMatKhau(email);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/public/dat-lai-mat-khau")
    public ResponseEntity<?> datLaiMatKhau(@RequestParam String email, @RequestParam String key,
                                           @RequestParam String password) throws URISyntaxException {
        userService.xacNhanDatLaiMatKhau(email, password, key);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user/user-logged")
    public ResponseEntity<?> userLogged() throws URISyntaxException {
        User user = userUtils.getUserWithAuthority();
        UserDto userDto = userMapper.userToUserDto(user); // Map User entity to UserDto

        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @PostMapping("/user/change-avatar")
    public String changeAvatar(@RequestParam("file") MultipartFile file){
        String link = cloudinaryService.uploadFile(file);
        User user = userUtils.getUserWithAuthority();
        user.setAvatar(link);
        userRepository.save(user);
        return link;
    }

    @PostMapping("/user/change-infor")
    public void changeInfor(@RequestParam String fullName, @RequestParam String phone, @RequestParam String address){
        User user = userUtils.getUserWithAuthority();
        user.setFullname(fullName);
        user.setPhone(phone);
        user.setAddress(address);
        userRepository.save(user);
    }

}
