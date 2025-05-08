

CREATE TABLE `authority` (
  `name` varchar(255) NOT NULL
);

--
-- Đang đổ dữ liệu cho bảng `authority`
--

INSERT INTO `authority` (`name`) VALUES
('ROLE_ADMIN'),
('ROLE_USER');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `banner`
--

CREATE TABLE `banner` (
  `id` bigint NOT NULL,
  `banner_type` int DEFAULT NULL,
  `id_product` bigint DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `link_web` varchar(255) DEFAULT NULL,
  `page_name` varchar(255) DEFAULT NULL
);

--
-- Đang đổ dữ liệu cho bảng `banner`
--

INSERT INTO `banner` (`id`, `banner_type`, `id_product`, `image`, `link_web`, `page_name`) VALUES
(1, 0, 1, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1716000513/imngtim421n4yjpktvqf.webp', 'detail.html?id=1', 'index.html'),
(2, 0, 7, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1716000526/sgzfanc4r4hdei2ruhc1.webp', 'detail.html?id=7', 'index.html'),
(3, 0, 3, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1716000540/nuw65tfyla4zd2dxjee5.webp', 'detail.html?id=3', 'index.html'),
(4, 0, 7, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1716000552/wkbfygpf1qmzjshtton7.webp', 'detail.html?id=7', 'index.html'),
(5, 0, 11, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1716000565/kle3bhncuo0w41efuul5.webp', 'detail.html?id=8', 'index.html'),
(6, 1, 5, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1716000594/j7txjnmqfu1sv8uoekul.webp', 'detail.html?id=5', 'ALL'),
(7, 1, 5, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1716000608/s1d3ihwyhonwv3xwrdba.webp', 'detail.html?id=8', 'ALL');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `blog`
--

CREATE TABLE `blog` (
  `id` bigint NOT NULL,
  `content` longtext ,
  `created_date` date DEFAULT NULL,
  `description` longtext ,
  `image_banner` varchar(255) DEFAULT NULL,
  `title` varchar(2000)  DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
);

--
-- Đang đổ dữ liệu cho bảng `blog`
--

INSERT INTO `blog` (`id`, `content`, `created_date`, `description`, `image_banner`, `title`, `user_id`) VALUES
(1, '<h2 class=\"ce-element ce-element--type-text\">Xo&agrave;i l&agrave; loại tr&aacute;i c&acirc;y nhiệt đới được y&ecirc;u th&iacute;ch bởi hương vị chua ngọt, thơm ngon. H&ocirc;m nay, c&ugrave;ng t&igrave;m hiểu c&aacute;ch l&agrave;m tr&agrave; xo&agrave;i tươi chua ngọt sảng kho&aacute;i v&ocirc; c&ugrave;ng đơn giản.</h2>\n<div class=\"hiddenbxindex\">\n<div class=\"hiddenctindxknh\">&nbsp;</div>\n</div>\n<div class=\"bxindexknh\">\n<div class=\"ctindxknh\">\n<div class=\"cursor-pointer\"><a>Xem nhanh</a></div>\n<div class=\"boxcontent-index\"><a id=\"hparentmenuid1\" href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-1565775#hmenuid1\">1. Nguy&ecirc;n liệu l&agrave;m tr&agrave; xo&agrave;i tươi</a><br><a id=\"hparentmenuid2\" href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-1565775#hmenuid2\">2. C&aacute;ch&nbsp;l&agrave;m tr&agrave; xo&agrave;i tươi</a><br><a class=\"childmenu\" href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-1565775#1hchildmenuid1\">&nbsp;Bước 1 Pha tr&agrave;</a><br><a class=\"childmenu\" href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-1565775#1hchildmenuid2\">&nbsp;Bước 2 Xay xo&agrave;i</a><br><a class=\"childmenu\" href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-1565775#1hchildmenuid3\">&nbsp;Bước 3 Pha tr&agrave; xo&agrave;i</a><br><a class=\"childmenu\" href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-1565775#1hchildmenuid4\">&nbsp;Bước 4 Th&agrave;nh phẩm</a><br><a id=\"hparentmenuid3\" href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-1565775#hmenuid3\">3. Thưởng thức</a></div>\n</div>\n</div>\n<p><img class=\"imgcontent\" title=\"Tr&agrave; xo&agrave;i tươi\" src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565775/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-202405171317471092.jpg\" alt=\"Tr&agrave; xo&agrave;i tươi\" width=\"360\" height=\"140\" data-id=\"1\"></p>\n<p><strong>Chuẩn bị</strong><br>5 ph&uacute;t<strong>Chế biến</strong><br>20 ph&uacute;t<strong>D&agrave;nh cho</strong><br>1 - 2 người</p>\n<p>Xo&agrave;i l&agrave; loại quả c&oacute; thể được d&ugrave;ng để ăn tươi hoặc l&agrave;m b&aacute;nh, l&agrave;m nước uống đều ngon. Trong b&agrave;i viết n&agrave;y của B&aacute;ch h&oacute;a XANH sẽ hướng dẫn bạn c&aacute;ch l&agrave;m tr&agrave; xo&agrave;i tươi chua ngọt, thơm ngon để giải kh&aacute;t. C&ugrave;ng tham khảo nh&eacute;!</p>\n<h3>1Nguy&ecirc;n liệu l&agrave;m tr&agrave; xo&agrave;i tươi</h3>\n<div class=\"ingredients\">\n<ul>\n<li>3 muỗng c&agrave; ph&ecirc; hoặc 2 t&uacute;i lọc&nbsp;<a href=\"https://www.bachhoaxanh.com/tra-kho-tui-loc/tra-lipton-nhan-vang-25-bags\" target=\"_blank\" rel=\"noopener\">tr&agrave; đen</a></li>\n<li>1 quả&nbsp;<a href=\"https://www.bachhoaxanh.com/trai-cay-tuoi-ngon-xoai\" target=\"_blank\" rel=\"noopener\">xo&agrave;i</a></li>\n<li>4 muỗng canh&nbsp;<a href=\"https://www.bachhoaxanh.com/duong\" target=\"_blank\" rel=\"noopener\">đường</a></li>\n<li>1-1.5 muỗng canh nước cốt&nbsp;<a href=\"https://www.bachhoaxanh.com/cu/chanh-khong-hat-tui-250g-2-4-trai\" target=\"_blank\" rel=\"noopener\">chanh</a></li>\n</ul>\n</div>\n<p><img class=\"imgcontent lazy initial loaded\" title=\"Nguy&ecirc;n liệu l&agrave;m tr&agrave; xo&agrave;i tươi\" src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565775/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-202405171318041511.jpg\" alt=\"Nguy&ecirc;n liệu l&agrave;m tr&agrave; xo&agrave;i tươi\" width=\"360\" height=\"140\" data-id=\"2\" data-src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565775/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-202405171318041511.jpg\" data-was-processed=\"true\"><span class=\"caption\">Nguy&ecirc;n liệu l&agrave;m tr&agrave; xo&agrave;i tươi</span></p>\n<h3 id=\"hmenuid2\" class=\"ce-element ce-element--type-text\">2C&aacute;ch&nbsp;l&agrave;m tr&agrave; xo&agrave;i tươi</h3>\n<h4 id=\"1hchildmenuid1\" class=\"ce-element ce-element--type-text\"><strong>Bước 1&nbsp;Pha tr&agrave;</strong></h4>\n<p class=\"ce-element ce-element--type-text\">Cho v&agrave;o nồi khoảng&nbsp;<strong>1 l&iacute;t nước v&agrave; đun s&ocirc;i ở lửa vừa</strong>, sau đ&oacute; tắt bếp. Bạn cho tr&agrave; đ&atilde; chuẩn bị v&agrave;o,&nbsp;<strong>đậy nắp v&agrave; ng&acirc;m trong khoảng 3-5 ph&uacute;t.</strong></p>\n<p><img class=\"imgcontent lazy initial loaded\" title=\"Pha tr&agrave;\" src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565775/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-202405171318213411.jpg\" alt=\"Pha tr&agrave;\" width=\"360\" height=\"140\" data-id=\"3\" data-src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565775/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-202405171318213411.jpg\" data-was-processed=\"true\"><span class=\"caption\">Pha tr&agrave;</span></p>\n<h4 id=\"1hchildmenuid2\" class=\"ce-element ce-element--type-text\"><strong>Bước 2&nbsp;Xay xo&agrave;i</strong></h4>\n<p class=\"ce-element ce-element--type-text\">Xo&agrave;i sau khi mua về th&igrave; bạn gọt vỏ, cắt thịt xo&agrave;i th&agrave;nh những khối vu&ocirc;ng nhỏ v&agrave;<strong>&nbsp;cho v&agrave;o m&aacute;y xay để xay nhuyễn.</strong></p>\n<p><img class=\"imgcontent lazy initial loaded\" title=\"Xay xo&agrave;i\" src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565775/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-202405171320132616.jpg\" alt=\"Xay xo&agrave;i\" width=\"360\" height=\"140\" data-id=\"5\" data-src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565775/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-202405171320132616.jpg\" data-was-processed=\"true\"><span class=\"caption\">Xay xo&agrave;i</span></p>\n<h4 id=\"1hchildmenuid3\" class=\"ce-element ce-element--type-text\"><strong>Bước 3&nbsp;Pha tr&agrave; xo&agrave;i</strong></h4>\n<p class=\"ce-element ce-element--type-text\">Cho tr&agrave; đ&atilde; pha v&agrave;o trong một b&igrave;nh đựng, th&ecirc;m&nbsp;<strong>4 muỗng canh đường,</strong>&nbsp;<strong>1-1.5 muỗng canh nước cốt chanh</strong>&nbsp;sau đ&oacute; khuấy đều cho đường tan.</p>\n<p class=\"ce-element ce-element--type-text\">Tiếp tục, bạn cho v&agrave;o xo&agrave;i đ&atilde; xay v&agrave;o rồi khuấy đều. Cuối c&ugrave;ng, bạn cho v&agrave;o trong ngăn m&aacute;t tủ lạnh trong<strong>&nbsp;4 giờ hoặc cho đến khi nước tr&agrave; lạnh.</strong></p>\n<p><img class=\"imgcontent lazy initial loaded\" title=\"Pha tr&agrave; xo&agrave;i\" src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565775/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-202405171320274274.jpg\" alt=\"Pha tr&agrave; xo&agrave;i\" width=\"360\" height=\"140\" data-id=\"6\" data-src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565775/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-202405171320274274.jpg\" data-was-processed=\"true\"><span class=\"caption\">Pha tr&agrave; xo&agrave;i</span></p>\n<h4 id=\"1hchildmenuid4\" class=\"ce-element ce-element--type-text\"><strong>Bước 4&nbsp;Th&agrave;nh phẩm</strong></h4>\n<p class=\"ce-element ce-element--type-text\">Cho v&agrave;i vi&ecirc;n đ&aacute; vi&ecirc;n v&agrave;o trong ly,&nbsp;<strong>r&oacute;t th&ecirc;m nước tr&agrave; xo&agrave;i đ&atilde; pha ở tr&ecirc;n v&agrave;o</strong>&nbsp;l&agrave; bạn đ&atilde; c&oacute; thể thưởng ngay rồi đấy.</p>\n<p><img class=\"imgcontent lazy initial loaded\" title=\"Th&agrave;nh phẩm\" src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565775/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-202405171322552136.jpg\" alt=\"Th&agrave;nh phẩm\" width=\"360\" height=\"140\" data-id=\"6\" data-src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565775/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-202405171322552136.jpg\" data-was-processed=\"true\"><span class=\"caption\">Th&agrave;nh phẩm</span></p>\n<h3 id=\"hmenuid3\" class=\"ce-element ce-element--type-text\">3Thưởng thức</h3>\n<p class=\"ce-element ce-element--type-text\">Tr&agrave; xo&agrave;i tươi ngon c&oacute;&nbsp;<strong>vị chua chua ngọt ngọt rất k&iacute;ch th&iacute;ch vị gi&aacute;c</strong>, đặc biệt khi uống lạnh rất sảng kho&aacute;i sẽ l&agrave; thức uống m&agrave; bạn sẽ y&ecirc;u th&iacute;ch ngay từ lần đầu thưởng thức.</p>\n<p><img class=\"imgcontent lazy initial loaded\" title=\"Thưởng thức tr&agrave; xo&agrave;i tươi\" src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565775/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-202405171323057307.jpg\" alt=\"Thưởng thức tr&agrave; xo&agrave;i tươi\" width=\"360\" height=\"140\" data-id=\"7\" data-src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565775/cach-lam-tra-xoai-tuoi-chua-ngot-sang-khoai-vo-cung-don-gian-202405171323057307.jpg\" data-was-processed=\"true\"><span class=\"caption\">Thưởng thức tr&agrave; xo&agrave;i tươi</span></p>\n<p class=\"ce-element ce-element--type-text\"><em>Tr&ecirc;n đ&acirc;y l&agrave; những hướng dẫn chi tiết c&aacute;ch l&agrave;m tr&agrave; xo&agrave;i tươi ngon, hấp d&atilde;n m&agrave; B&aacute;ch h&oacute;a XANH muốn gửi đến bạn. Hy vọng bạn sẽ y&ecirc;u th&iacute;ch m&oacute;n thức uống ngon miệng n&agrave;y!</em></p>', '2024-05-18', 'Xoài là loại quả có thể được dùng để ăn tươi hoặc làm bánh, làm nước uống đều ngon. Trong bài viết này của Bách hóa XANH sẽ hướng dẫn bạn cách làm trà xoài tươi chua ngọt, thơm ngon để giải khát. Cùng tham khảo nhé!', 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715999496/zlyi5dlucvtopycfq609.jpg', 'Cách làm trà xoài tươi chua ngọt sảng khoái, vô cùng đơn giản', 1),
(2, '<p class=\"ce-element ce-element--type-text\">Để chống lại việc thiếu hụt dinh dưỡng ở người cao tuổi, nhiều người thường chỉ ch&uacute; &yacute; đến những chất như&nbsp;<a href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/chat-beo-hay-lipid-la-gi-984559\">chất b&eacute;o</a>,&nbsp;<a href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/chat-dam-hay-protein-la-gi-984580\">protein</a>,&nbsp;<a href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/carbohydrate-la-gi-va-carbohydrate-trong-loai-thuc-pham-nao-la-tot-1320904\">carbohydrate</a>&nbsp;m&agrave; &iacute;t quan t&acirc;m đến c&aacute;c vi chất dinh dưỡng kh&aacute;c như&nbsp;<a href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/vitamin-la-gi-cac-loai-vitamin-va-cong-dung-cua-chung-voi-suc-khoe-1145500\">vitamin</a>,&nbsp;<a href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/khoang-chat-trong-co-the-con-nguoi-va-tam-quan-trong-cua-no-1014034\">kho&aacute;ng chất</a>. Dưới đ&acirc;y l&agrave; th&ocirc;ng tin về 5 t&igrave;nh trạng&nbsp;thiếu hụt vi chất dinh dưỡng thường thấy ở người cao tuổi m&agrave; bạn n&ecirc;n quan t&acirc;m.</p>\n<h3 class=\"ce-element ce-element--type-text\">1Người cao tuổi rất dễ thiếu canxi</h3>\n<p class=\"ce-element ce-element--type-text\"><a href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/canxi-la-gi-vai-tro-cua-canxi-va-cac-thuc-pham-giau-canxi-985331\">Canxi</a>&nbsp;l&agrave; một kho&aacute;ng chất rất quan trọng cho sự ph&aacute;t triển v&agrave; duy tr&igrave; mật độ xương của cơ thể. Tuy nhi&ecirc;n, khi tuổi t&aacute;c ng&agrave;y c&agrave;ng cao th&igrave; h&agrave;m lượng canxi trong cơ thể ng&agrave;y c&agrave;ng &iacute;t đi, dẫn đến nhiều nguy hại sức khỏe.</p>\n<p class=\"ce-element ce-element--type-text\">Theo th&ocirc;ng tin từ<em>&nbsp;PGS.TS. Nguyễn Thị L&acirc;m, nguy&ecirc;n Ph&oacute; Viện trưởng Viện Dinh dưỡng Quốc gia</em>&nbsp;cho biết,&nbsp;canxi l&agrave; một trong những chất thiết yếu của cơ thể con người,&nbsp;<strong>gi&uacute;p x&acirc;y dựng hệ xương v&agrave; răng, đồng thời c&ograve;n hỗ trợ qu&aacute; tr&igrave;nh điều h&ograve;a huyết &aacute;p v&agrave; đ&ocirc;ng m&aacute;u.</strong></p>\n<p><img class=\"imgcontent\" title=\"Người cao tuổi rất dễ thiếu canxi\" src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565765/5-tinh-trang-thieu-hut-vi-chat-dinh-duong-pho-bien-o-nguoi-cao-tuoi-202405171053580984.jpg\" alt=\"Người cao tuổi rất dễ thiếu canxi\" data-id=\"1\"><span class=\"caption\">Người cao tuổi rất dễ thiếu canxi</span></p>\n<p class=\"ce-element ce-element--type-text\">Người gi&agrave; thường c&oacute; khả năng hấp thụ k&eacute;m dẫn đến ti&ecirc;u thụ &iacute;t canxi, do đ&oacute;&nbsp;<strong>nguồn canxi trong xương sẽ được cơ thể sử dụng để duy tr&igrave; c&aacute;c hoạt động kh&aacute;c.</strong>&nbsp;Ch&iacute;nh điều n&agrave;y m&agrave; nguy cơ bị&nbsp;<strong>lo&atilde;ng xương, g&atilde;y xương</strong>&nbsp;ở người gi&agrave; tăng cao.</p>\n<p class=\"ce-element ce-element--type-text\">Người cao tuổi c&oacute; thể bổ sung canxi th&ocirc;ng qua nguồn thực phẩm như<strong>&nbsp;<a href=\"https://www.bachhoaxanh.com/trung\">trứng</a>,&nbsp;<a href=\"https://www.bachhoaxanh.com/sua-tuoi\">sữa</a>,&nbsp;<a href=\"https://www.bachhoaxanh.com/cu/bong-cai-xanh-400g-500g\">b&ocirc;ng cải xanh</a>,&nbsp;<a href=\"https://www.bachhoaxanh.com/rau-sach\">rau xanh</a>,...</strong></p>\n<h3 class=\"ce-element ce-element--type-text\">2Vitamin D cần thiết với người cao tuổi</h3>\n<p class=\"ce-element ce-element--type-text\"><a href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/vitamin-d-la-gi-tac-dung-cua-vitamin-d-doi-voi-co-992126\">Vitamin D</a>&nbsp;l&agrave; loại vitamin cần thiết với sức khỏe của&nbsp;<strong>xương khớp v&agrave; hệ miễn dịch</strong>. Ngo&agrave;i ra, vitamin D cũng rất quan trọng với qu&aacute; tr&igrave;nh cơ thể hấp thụ canxi, nếu thiết loại vitamin n&agrave;y sẽ khiến cơ thể kh&ocirc;ng hấp thụ đủ lượng canxi cần thiết.</p>\n<p class=\"ce-element ce-element--type-text\">Đa số người cao tuổi thường hay bị thiếu hụt vitamin D, do đ&oacute; cần phải<strong>&nbsp;tăng nhiều thời gian hoạt động ngo&agrave;i trời để c&oacute; thể&nbsp;tăng mức vitamin D</strong>, nếu kh&ocirc;ng th&igrave; n&ecirc;n tham khảo &yacute; kiến của b&aacute;c sĩ về việc bổ sung chất dinh dưỡng n&agrave;y.</p>\n<p><img class=\"imgcontent\" title=\"Vitamin D cần thiết với người cao tuổi\" src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565765/5-tinh-trang-thieu-hut-vi-chat-dinh-duong-pho-bien-o-nguoi-cao-tuoi-202405171054073277.jpg\" alt=\"Vitamin D cần thiết với người cao tuổi\" data-id=\"2\"><span class=\"caption\">Vitamin D cần thiết với người cao tuổi</span></p>\n<h3 class=\"ce-element ce-element--type-text\">3Folate c&oacute; t&aacute;c dụng giảm l&atilde;o h&oacute;a</h3>\n<p class=\"ce-element ce-element--type-text\">Folate (axit folic) l&agrave; một loại vitamin B thiết yếu kh&ocirc;ng chỉ c&oacute; lợi với phụ nữ mang thai m&agrave; cũng rất cần cho người cao tuổi.</p>\n<p class=\"ce-element ce-element--type-text\">Ở người cao tuổi, folate c&oacute; thể gi&uacute;p&nbsp;<strong>ngăn ngừa c&aacute;c dấu hiệu l&atilde;o h&oacute;a v&agrave; cải thiện khả năng nhận thức.</strong>&nbsp;Ngo&agrave;i thực phẩm bổ sung, folate cũng c&oacute; nhiều trong c&aacute;c loại&nbsp;<a href=\"https://www.bachhoaxanh.com/trai-cay-tuoi-ngon\">tr&aacute;i c&acirc;y</a>, rau quả,&nbsp;<a href=\"https://www.bachhoaxanh.com/nuoc-ep-trai-cay\">nước tr&aacute;i c&acirc;y</a>&nbsp;v&agrave;&nbsp;<a href=\"https://www.bachhoaxanh.com/bot-ngu-coc-ngu-coc-an-sang\">ngũ cốc</a>&nbsp;ăn s&aacute;ng.</p>\n<p><img class=\"imgcontent\" title=\"Folate c&oacute; t&aacute;c dụng giảm l&atilde;o h&oacute;a\" src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565765/5-tinh-trang-thieu-hut-vi-chat-dinh-duong-pho-bien-o-nguoi-cao-tuoi-202405171054178557.jpg\" alt=\"Folate c&oacute; t&aacute;c dụng giảm l&atilde;o h&oacute;a\" data-id=\"3\"><span class=\"caption\">Folate c&oacute; t&aacute;c dụng giảm l&atilde;o h&oacute;a</span></p>\n<h3 class=\"ce-element ce-element--type-text\">4Vitamin B12&nbsp;hỗ trợ chức năng thần kinh</h3>\n<p class=\"ce-element ce-element--type-text\"><a href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/vitamin-b12-hay-cobalamin-la-gi-995834\">Vitamin B12</a>&nbsp;l&agrave; loại vitamin cần thiết cho việc<strong>&nbsp;tạo ra DNA v&agrave; hồng cầu khỏe mạnh trong cơ thể</strong>, đồng thời cũng quan trọng với chức năng thần kinh.</p>\n<p class=\"ce-element ce-element--type-text\">Nhiều người cao tuổi thường gặp phải t&igrave;nh trạng thiếu vitamin B12 do gặp kh&oacute;&nbsp;trong việc hấp thụ vitamin n&agrave;y. Ngo&agrave;i&nbsp;việc sử dụng chất bổ sung vitamin B12 th&igrave;&nbsp;ăn nhiều thực phẩm gi&agrave;u vitamin B12 l&agrave; rất cần thiết. Một số thực phẩm gi&agrave;u vitamin B12 như&nbsp;<strong><a href=\"https://www.bachhoaxanh.com/ca-tom-muc-ech\">c&aacute;</a>,&nbsp;<a href=\"https://www.bachhoaxanh.com/trung\">trứng</a>, thịt đỏ, thịt gia cầm, sữa,...</strong></p>\n<p><img class=\"imgcontent\" title=\"Vitamin B12 hỗ trợ chức năng thần kinh\" src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565765/5-tinh-trang-thieu-hut-vi-chat-dinh-duong-pho-bien-o-nguoi-cao-tuoi-202405171054263827.jpg\" alt=\"Vitamin B12 hỗ trợ chức năng thần kinh\" data-id=\"4\"><span class=\"caption\">Vitamin B12 hỗ trợ chức năng thần kinh</span></p>\n<h3 class=\"ce-element ce-element--type-text\">5Vitamin E n&acirc;ng cao hệ miễn dịch</h3>\n<p class=\"ce-element ce-element--type-text\"><a href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/vitamin-e-va-cong-dung-cua-chung-doi-voi-suc-khoe-999486\">Vitamin E</a>&nbsp;l&agrave; một&nbsp;<a href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/chat-chong-oxy-hoa-la-gi-chat-chong-oxy-hoa-co-o-dau-an-gi-de-bo-sung-chat-chong-oxy-hoa-1266493\">chất chống oxy h&oacute;a</a>&nbsp;h&ograve;a tan trong&nbsp;<a href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/chat-beo-hay-lipid-la-gi-984559\">chất b&eacute;o</a>, c&oacute; khả năng<strong>&nbsp;giảm căng thẳng oxy h&oacute;a v&agrave; ngăn ngừa c&aacute;c căn bệnh mạn t&iacute;nh</strong>. Ngo&agrave;i ra, vitamin E cũng quan trọng đối với hệ thống miễn dịch, qu&aacute; tr&igrave;nh trao đổi chất trong cơ thể con người.</p>\n<p class=\"ce-element ce-element--type-text\">Một số thực phẩm gi&agrave;u vitamin E như&nbsp;<a href=\"https://www.bachhoaxanh.com/cac-loai-hat\">c&aacute;c loại hạt</a>, trứng, thịt nạc, c&aacute;c loại đậu, rau xanh,...</p>\n<p><img class=\"imgcontent\" title=\"Vitamin E n&acirc;ng cao hệ miễn dịch\" src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565765/5-tinh-trang-thieu-hut-vi-chat-dinh-duong-pho-bien-o-nguoi-cao-tuoi-202405171054361443.jpg\" alt=\"Vitamin E n&acirc;ng cao hệ miễn dịch\" data-id=\"5\"><span class=\"caption\">Vitamin E n&acirc;ng cao hệ miễn dịch</span></p>\n<p class=\"ce-element ce-element--type-text\"><em>Tr&ecirc;n đ&acirc;y l&agrave; những th&ocirc;ng tin mới về 5 t&igrave;nh trạng thiếu vi chất phổ biến ở người cao tuổi m&agrave; bạn v&agrave; gia đ&igrave;nh n&ecirc;n quan t&acirc;m khi chăm s&oacute;c người gi&agrave;. Hy vọng những th&ocirc;ng tin tr&ecirc;n sẽ hữu &iacute;ch, gi&uacute;p bạn chăm s&oacute;c sức khỏe người lớn tuổi tốt hơn!</em></p>', '2024-05-18', 'Người già thường gặp phải tình trạng kém hấp thu do chức năng của hệ tiêu hóa suy giảm. Tìm hiểu 5 tình trạng thiếu hụt vi chất dinh dưỡng phổ biến ở người cao tuổi.', 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715999573/ucvtgd3xgzb0z8na94tn.jpg', '5 tình trạng thiếu hụt vi chất dinh dưỡng phổ biến ở người cao tuổi', 1),
(3, '<p class=\"ce-element ce-element--type-text\">Tuổi t&aacute;c chỉ l&agrave; con số, minh chứng cho điều đ&oacute; ch&iacute;nh l&agrave; c&acirc;u chuyện của b&agrave; Zhenzhen, 64 tuổi, đến từ V&acirc;n Nam, Trung Quốc. Nhờ tập gym đều đặn v&agrave; tu&acirc;n thủ chế độ ăn uống khoa học, b&agrave; đ&atilde; c&oacute; được v&oacute;c d&aacute;ng thon gọn, mảnh mai như thiếu nữ 20 tuổi. B&iacute; quyết của b&agrave; l&agrave; g&igrave;? H&atilde;y c&ugrave;ng kh&aacute;m ph&aacute; trong b&agrave;i viết n&agrave;y!</p>\n<h3 class=\"ce-element ce-element--type-text\">164 tuổi vẫn giữ th&acirc;n h&igrave;nh săn chắc nhờ tập gym</h3>\n<p class=\"ce-element ce-element--type-text\">B&agrave; Zhenzhen, 64 tuổi, sống ở V&acirc;n Nam, Trung Quốc, l&agrave; minh chứng cho c&acirc;u n&oacute;i \"tuổi t&aacute;c chỉ l&agrave; con số\".<strong>&nbsp;Suốt 8 năm qua kể từ khi nghỉ hưu, b&agrave; vẫn duy tr&igrave; th&oacute;i quen tập luyện chăm chỉ tại ph&ograve;ng gym</strong>&nbsp;v&agrave; sở hữu th&acirc;n h&igrave;nh săn chắc, c&acirc;n đối khiến nhiều người phải ao ước.</p>\n<p class=\"ce-element ce-element--type-text\">D&ugrave; đ&atilde; ở tuổi 64, b&agrave; Zhenzhen vẫn&nbsp;<strong>giữ được c&acirc;n nặng l&yacute; tưởng 46kg v&agrave; tỷ lệ mỡ cơ thể chỉ 17%</strong>, con số m&agrave; ngay cả c&aacute;c c&ocirc; g&aacute;i trẻ cũng kh&oacute; c&oacute; thể đạt được. Khi mặc đồ b&oacute; s&aacute;t, th&acirc;n h&igrave;nh săn chắc, khỏe mạnh của b&agrave; c&agrave;ng được lộ r&otilde;.</p>\n<p class=\"ce-element ce-element--type-text\"><img class=\"imgcontent\" title=\"Tập luyện thể thao đ&atilde; gi&uacute;p b&agrave; Zhenzhen vượt qua nỗi sợ h&atilde;i về tuổi gi&agrave;. Ảnh: Douyin.\" src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565770/bi-quyet-so-huu-voc-dang-manh-mai-o-tuoi-64-nho-tap-gym-202405171037121260.jpg\" alt=\"Tập luyện thể thao đ&atilde; gi&uacute;p b&agrave; Zhenzhen vượt qua nỗi sợ h&atilde;i về tuổi gi&agrave;. Ảnh: Douyin.\" data-id=\"1\"><span class=\"caption\">Tập luyện thể thao đ&atilde; gi&uacute;p b&agrave; Zhenzhen vượt qua nỗi sợ h&atilde;i về tuổi gi&agrave;. Ảnh: Douyin.</span></p>\n<p class=\"ce-element ce-element--type-text\">B&agrave; Zhenzhen chia sẻ tr&ecirc;n mạng x&atilde; hội Xiaohongshu rằng, tập luyện thể thao đ&atilde; gi&uacute;p b&agrave; vượt qua nỗi sợ h&atilde;i về tuổi gi&agrave;. B&agrave; cho biết:&nbsp;<em>\"T&ocirc;i c&oacute; thể cảm nhận được sức sống của cơ thể m&igrave;nh đang dần cải thiện mỗi ng&agrave;y. Mồ h&ocirc;i đổ ra l&agrave; minh chứng cho nỗ lực v&agrave; th&agrave;nh quả của t&ocirc;i. Ch&uacute;ng ta kh&ocirc;ng thể chống lại quy luật tự nhi&ecirc;n, nhưng ho&agrave;n to&agrave;n c&oacute; thể lựa chọn sống khỏe mạnh v&agrave; hạnh ph&uacute;c khi về gi&agrave;.\"</em></p>\n<p class=\"ce-element ce-element--type-text\">B&agrave; Zhenzhen c&oacute; một con trai 36 tuổi. Trước khi nghỉ hưu ở tuổi 55, b&agrave; l&agrave; gi&aacute;m đốc dự &aacute;n của một c&ocirc;ng ty lắp đặt hệ thống cứu hỏa. Sau khi nghỉ hưu, b&agrave; cảm thấy lo lắng về tuổi gi&agrave; v&agrave; sức khỏe của bản th&acirc;n. B&agrave; từng bị thương mắt c&aacute; ch&acirc;n phải tr&ecirc;n c&ocirc;ng trường x&acirc;y dựng v&agrave; gặp vấn đề về khớp đầu gối.</p>\n<p class=\"ce-element ce-element--type-text\">Ch&iacute;nh những l&yacute; do đ&oacute; đ&atilde; th&ocirc;i th&uacute;c b&agrave; Zhenzhen bắt đầu&nbsp;<a href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/tap-the-duc/tag\">tập luyện thể thao</a>. Ban đầu, b&agrave; gặp nhiều kh&oacute; khăn do cơ thể yếu v&agrave; thiếu sức bền. Tuy nhi&ecirc;n, với sự ki&ecirc;n tr&igrave; v&agrave; quyết t&acirc;m, b&agrave; đ&atilde; dần cải thiện sức khỏe v&agrave; đạt được kết quả như mong muốn.</p>\n<p class=\"ce-element ce-element--type-text\">C&acirc;u chuyện của b&agrave; Zhenzhen l&agrave; minh chứng cho việc tập luyện thể thao c&oacute; thể mang lại nhiều lợi &iacute;ch cho sức khỏe, tinh thần v&agrave; gi&uacute;p ch&uacute;ng ta sống khỏe mạnh, hạnh ph&uacute;c ở mọi lứa tuổi.</p>\n<h3 class=\"ce-element ce-element--type-text\">2B&iacute; quyết \"l&atilde;o h&oacute;a ngược\" nhờ tập luyện sau tuổi 60</h3>\n<p class=\"ce-element ce-element--type-text\">B&agrave; Zhenzhen, 64 tuổi, từng e d&egrave; về v&oacute;c d&aacute;ng sau tuổi nghỉ hưu. Tuy nhi&ecirc;n, nhờ&nbsp;<strong>tập luyện chăm chỉ với sự hướng dẫn của huấn luyện vi&ecirc;n c&aacute; nh&acirc;n</strong>, b&agrave; đ&atilde; \"lột x&aacute;c\" ngoạn mục, sở hữu th&acirc;n h&igrave;nh săn chắc v&agrave; tr&agrave;n đầy sức sống.</p>\n<p class=\"ce-element ce-element--type-text\">Trước đ&acirc;y, Zhenzhen lo lắng về việc kh&ocirc;ng c&ograve;n thể diện trang phục b&oacute; s&aacute;t như quần legging hay v&aacute;y &ocirc;m. Tuy nhi&ecirc;n, giờ đ&acirc;y,&nbsp;<strong>b&agrave; tự tin khoe d&aacute;ng trong những bộ đồ y&ecirc;u th&iacute;ch, kh&ocirc;ng c&ograve;n ngại ng&ugrave;ng về v&ograve;ng eo hay mỡ thừa.</strong></p>\n<p class=\"ce-element ce-element--type-text\"><img class=\"imgcontent\" title=\"B&agrave; Zhenzhen sở hữu th&acirc;n h&igrave;nh đ&aacute;ng mơ ước nhờ tập luyện chăm chỉ. Ảnh: Douyin\" src=\"https://cdn.tgdd.vn/Files/2024/05/17/1565770/bi-quyet-so-huu-voc-dang-manh-mai-o-tuoi-64-nho-tap-gym-202405171037540919.jpg\" alt=\"B&agrave; Zhenzhen sở hữu th&acirc;n h&igrave;nh đ&aacute;ng mơ ước nhờ tập luyện chăm chỉ. Ảnh: Douyin\" data-id=\"2\"><span class=\"caption\">B&agrave; Zhenzhen sở hữu th&acirc;n h&igrave;nh đ&aacute;ng mơ ước nhờ tập luyện chăm chỉ. Ảnh: Douyin</span></p>\n<p class=\"ce-element ce-element--type-text\">B&iacute; quyết của Zhenzhen ch&iacute;nh l&agrave; tập trung v&agrave;o c&aacute;c b&agrave;i tập tăng cường sức mạnh cơ bắp để bảo vệ khớp v&agrave; cải thiện sự c&acirc;n bằng.&nbsp;<strong>Mỗi ng&agrave;y b&agrave; d&agrave;nh khoảng 2 tiếng để tập luyện trong ph&ograve;ng gym</strong>, nhờ tập luyện, b&agrave; cảm thấy tr&agrave;n đầy năng lượng v&agrave; y&ecirc;u đời hơn.</p>\n<p class=\"ce-element ce-element--type-text\">Zhenzhen chia sẻ:<em>&nbsp;\"T&ocirc;i kh&ocirc;ng hề can thiệp thẩm mỹ để giữ g&igrave;n nhan sắc. Mọi thứ đều đến từ việc tập luyện chăm chỉ sau khi nghỉ hưu.\"</em>&nbsp;C&acirc;u chuyện của b&agrave; đ&atilde; truyền cảm hứng cho nhiều người, đặc biệt l&agrave; những ai đang e ngại về tuổi t&aacute;c v&agrave; ngoại h&igrave;nh.</p>\n<p class=\"ce-element ce-element--type-text\">Nhiều người kh&ocirc;ng thể tin được Zhenzhen đ&atilde; 64 tuổi bởi v&oacute;c d&aacute;ng săn chắc v&agrave; tr&agrave;n đầy sức sống của b&agrave;. \"Cả khi 30 tuổi t&ocirc;i cũng kh&ocirc;ng c&oacute; th&acirc;n h&igrave;nh như thế\", một người b&igrave;nh luận. \"B&agrave; đ&atilde; l&agrave;m t&ocirc;i thay đổi c&aacute;ch nh&igrave;n về tuổi 60. Mong rằng m&igrave;nh cũng c&oacute; thể như b&agrave; ở c&aacute;i tuổi đ&oacute;\", một người kh&aacute;c cũng c&oacute; chia sẻ tương tự.</p>\n<p class=\"ce-element ce-element--type-text\">V&agrave;o dịp sinh nhật lần thứ 63, Zhenzhen đ&atilde; hứa với huấn luyện vi&ecirc;n sẽ tập luyện đến 65 tuổi. Tuy nhi&ecirc;n, hiện tại, b&agrave; quyết định sẽ tiếp tục tập luyện v&agrave; duy tr&igrave; phong độ n&agrave;y cho đến khi 70 tuổi.</p>\n<p class=\"ce-element ce-element--type-text\"><em>C&acirc;u chuyện của Zhenzhen l&agrave; minh chứng cho việc kh&ocirc;ng bao giờ l&agrave; qu&aacute; muộn để thay đổi bản th&acirc;n v&agrave; hướng đến cuộc sống khỏe mạnh, tr&agrave;n đầy năng lượng.&nbsp;Nếu bạn cũng đang mong muốn cải thiện v&oacute;c d&aacute;ng v&agrave; sức khỏe, h&atilde;y bắt đầu tập gym ngay từ h&ocirc;m nay. H&atilde;y nhớ kết hợp tập luyện với chế độ dinh dưỡng hợp l&yacute; để đạt được hiệu quả tốt nhất.</em></p>', '2024-05-18', 'Bí quyết giúp phụ nữ 64 tuổi sở hữu vóc dáng thon gọn, mảnh mai nhờ tập gym đều đặn cùng chế độ ăn uống hợp lý. Cùng tìm hiểu bí quyết qua bài viết sau.', 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715999607/tuuss3fiztsqen8krypt.jpg', 'Bí quyết sở hữu vóc dáng mảnh mai ở tuổi 64 nhờ tập gym', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `id` bigint NOT NULL,
  `quantity` int DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` bigint NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
);

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `image`, `name`) VALUES
(1, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715993452/gh9tnxzknattvcc6d5kz.jpg', 'Thịt, cá, trứng, hải sản'),
(3, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715994119/s8fbbhrtmickmp3q91tx.jpg', 'Rau củ, nấm, trái cây'),
(4, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715994148/rvddgfmoiwhaotvha17t.jpg', 'KEM, THỰC PHẨM ĐÔNG MÁT'),
(5, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715994181/mhdo4jhjykn3rc1oz7nk.jpg', 'MÌ, MIẾN, CHÁO, PHỞ'),
(6, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715994202/t8chsjx1mhewgp56sse2.jpg', 'GẠO, BỘT, ĐỒ KHÔ'),
(7, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715994221/w9ifxnoamrhv5njhebsn.jpg', 'BIA, NƯỚC GIẢI KHÁT'),
(8, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715994242/bvpsewtnit7vrlepx7jb.jpg', 'SỮA CÁC LOẠI'),
(9, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715994263/mqh7bgopo5ncockwo6r6.jpg', 'BÁNH KẸO CÁC LOẠI'),
(10, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715994286/zuxlt1zknpdhtvwfy1xq.jpg', 'CHĂM SÓC CÁ NHÂN'),
(11, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715994307/vyinltsmqxeujffpbqbu.jpg', 'SẢN PHẨM CHO MẸ VÀ BÉ'),
(12, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715994326/ll5nd3s5dsc1lybfarqc.jpg', 'VỆ SINH NHÀ CỬA'),
(13, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715994347/feyukrxc8a1iwdujnzju.jpg', 'ĐỒ DÙNG GIA ĐÌNH');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `history_pay`
--

CREATE TABLE `history_pay` (
  `id` bigint NOT NULL,
  `created_date` date DEFAULT NULL,
  `created_time` time DEFAULT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `request_id` varchar(255) DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `invoice_id` bigint DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `import_product`
--

CREATE TABLE `import_product` (
  `id` bigint NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `import_date` date DEFAULT NULL,
  `import_price` double DEFAULT NULL,
  `import_time` time DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `product_id` bigint DEFAULT NULL
);

--
-- Đang đổ dữ liệu cho bảng `import_product`
--

INSERT INTO `import_product` (`id`, `description`, `import_date`, `import_price`, `import_time`, `quantity`, `product_id`) VALUES
(1, '<p>nh&agrave; ph&acirc;n phối 1</p>', '2024-05-18', 16000, '08:50:50', 500, 1),
(2, '<p>nh&agrave; số 1</p>', '2024-05-18', 80000, '08:51:18', 130, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invoice`
--

CREATE TABLE `invoice` (
  `id` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `created_time` time DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `pay_type` int DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `status_invoice` int DEFAULT NULL,
  `status_update_date` datetime DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invoice_detail`
--

CREATE TABLE `invoice_detail` (
  `id` bigint NOT NULL,
  `price` double DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `invoice_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` bigint NOT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `description` longtext ,
  `expiry` varchar(255) DEFAULT NULL,
  `image_banner` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `old_price` double DEFAULT NULL,
  `price` double DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `quantity_sold` int DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL
);

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `deleted`, `description`, `expiry`, `image_banner`, `name`, `old_price`, `price`, `quantity`, `quantity_sold`, `unit`, `category_id`) VALUES
(1, b'0', '<div class=\"text-14 leading-5\"><a href=\"http://www.bachhoaxanh.com/kem-danh-rang-colgate\">Kem đ&aacute;nh răng&nbsp;Colgate</a>&nbsp;l&agrave;&nbsp;nh&atilde;n hiệu&nbsp;<a href=\"http://www.bachhoaxanh.com/kem-danh-rang\">kem đ&aacute;nh răng&nbsp;</a>của Mỹ chuy&ecirc;n về c&aacute;c sản phẩm vệ sinh răng miệng.&nbsp;<a title=\"Bộ b&agrave;n chải đ&aacute;nh răng v&agrave; kem đ&aacute;nh răng Colgate MaxFresh tinh chất than tre 225g\" href=\"https://www.bachhoaxanh.com/kem-danh-rang/bo-ban-chai-danh-rang-va-kem-danh-rang-colgate-maxfresh-tinh-chat-than-tre-225g\">Bộ b&agrave;n chải đ&aacute;nh răng v&agrave; kem đ&aacute;nh răng Colgate MaxFresh tinh chất than tre 225g</a>&nbsp;tiện lợi, l&agrave;m trắng răng &amp; bảo vệ răng từ thi&ecirc;n nhi&ecirc;n - loại bỏ mảng b&aacute;m tr&ecirc;n răng.</div>\n<table class=\"mt-3 text-14 leading-5\">\n<tbody>\n<tr>\n<td class=\"whitespace-nowrap border-2 border-[#f1f1f1] bg-[#f4f6f9] px-4 py-2 align-top\">Thương hiệu</td>\n<td class=\"w-full border-2 border-DEFAULT px-4 py-2\">\n<div class=\"text-justify\">Colgate (Mỹ)</div>\n</td>\n</tr>\n<tr>\n<td class=\"whitespace-nowrap border-2 border-[#f1f1f1] bg-[#f4f6f9] px-4 py-2 align-top\">Sản xuất tại</td>\n<td class=\"w-full border-2 border-DEFAULT px-4 py-2\">\n<div class=\"text-justify\">Trung Quốc</div>\n</td>\n</tr>\n<tr>\n<td class=\"whitespace-nowrap border-2 border-[#f1f1f1] bg-[#f4f6f9] px-4 py-2 align-top\">C&ocirc;ng dụng</td>\n<td class=\"w-full border-2 border-DEFAULT px-4 py-2\">\n<div class=\"text-justify\">Gi&uacute;p trắng răng, hơi thở thơm m&aacute;t</div>\n</td>\n</tr>\n<tr>\n<td class=\"whitespace-nowrap border-2 border-[#f1f1f1] bg-[#f4f6f9] px-4 py-2 align-top\">Th&agrave;nh phần</td>\n<td class=\"w-full border-2 border-DEFAULT px-4 py-2\">\n<div class=\"text-justify\">Sorbitol, Water, Hydrated Silica, Sodium Laryl Sulfate, Flavour, PEG-12, Tetrasodium Pyrophosphate, Cellulose Gum, Cocamidopropyl Betaine, Sodium Saccharin, Sodium Fluoride, Hydroxypropyl Methylcellulose, Bambusa Vulgaris Shoot Extra, Charcoal Powder, CI 77891, CI 74260.</div>\n</td>\n</tr>\n<tr>\n<td class=\"whitespace-nowrap border-2 border-[#f1f1f1] bg-[#f4f6f9] px-4 py-2 align-top\">B&agrave;n chải đ&aacute;nh răng</td>\n<td class=\"w-full border-2 border-DEFAULT px-4 py-2\">\n<div class=\"text-justify\">B&agrave;n chải đ&aacute;nh răng Colgate si&ecirc;u mềm mảnh</div>\n</td>\n</tr>\n<tr>\n<td class=\"whitespace-nowrap border-2 border-[#f1f1f1] bg-[#f4f6f9] px-4 py-2 align-top\">Khối lượng</td>\n<td class=\"w-full border-2 border-DEFAULT px-4 py-2\">\n<div class=\"text-justify\">200g</div>\n</td>\n</tr>\n<tr>\n<td class=\"whitespace-nowrap border-2 border-[#f1f1f1] bg-[#f4f6f9] px-4 py-2 align-top\">Lưu &yacute;</td>\n<td class=\"w-full border-2 border-DEFAULT px-4 py-2\">\n<div class=\"text-justify\">Trẻ dưới 6 tuổi chỉ sử dụng một lượng kem nhỏ bằng hạt đậu v&agrave; cần sự hướng dẫn của người lớn. Hạn chế nuốt. Trẻ em n&ecirc;n s&uacute;c miệng kỹ sau khi đ&aacute;nh răng</div>\n</td>\n</tr>\n<tr>\n<td class=\"whitespace-nowrap border-2 border-[#f1f1f1] bg-[#f4f6f9] px-4 py-2 align-top\">Khuy&ecirc;n d&ugrave;ng</td>\n<td class=\"w-full border-2 border-DEFAULT px-4 py-2\">\n<div class=\"text-justify\">Chải răng thật kĩ &iacute;t nhất 2 lần mỗi ng&agrave;y hoặc theo hướng dẫn của nha sĩ. D&ugrave;ng &iacute;t nhất 1g kem cho mỗi lần chải răng. Kh&ocirc;ng được nuốt, n&ecirc;n s&uacute;c miệng kỹ sau mỗi lần chải răng.</div>\n</td>\n</tr>\n<tr>\n<td class=\"whitespace-nowrap border-2 border-[#f1f1f1] bg-[#f4f6f9] px-4 py-2 align-top\">Bộ gồm</td>\n<td class=\"w-full border-2 border-DEFAULT px-4 py-2\">\n<div class=\"text-justify\">1 kem đ&aacute;nh răng Colgate MaxFresh Charcoal v&agrave; 1 b&agrave;n chải đ&aacute;nh răng Colgate si&ecirc;u mềm mảnh</div>\n</td>\n</tr>\n<tr>\n<td class=\"whitespace-nowrap border-2 border-[#f1f1f1] bg-[#f4f6f9] px-4 py-2 align-top\">Bảo quản</td>\n<td class=\"w-full border-2 border-DEFAULT px-4 py-2\">\n<div class=\"text-justify\">Nơi kh&ocirc; tho&aacute;ng, tr&aacute;nh &aacute;nh nắng trực tiếp</div>\n</td>\n</tr>\n</tbody>\n</table>\n<p class=\"mb-2 mt-3 lg:font-bold\">B&agrave;i viết sản phẩm</p>\n<div class=\"text-14 leading-5\">\n<h3><strong>Đ&ocirc;i n&eacute;t về thương hiệu Colgate</strong></h3>\n<p>Th&agrave;nh lập từ năm 1806, Colgate-Palmolive l&agrave; thương hiệu l&acirc;u đời nổi tiếng với c&aacute;c sản phẩm chăm s&oacute;c răng miệng, chăm s&oacute;c t&oacute;c v&agrave; chăm s&oacute;c cơ thể d&agrave;nh cho c&aacute; nh&acirc;n v&agrave; gia đ&igrave;nh được cả thế giới tin d&ugrave;ng trong nhiều thập kỷ qua. C&ocirc;ng ty lu&ocirc;n lu&ocirc;n nghi&ecirc;n cứu đổi mới, ph&aacute;t triển v&agrave; cho ra đời nhiều d&ograve;ng sản phẩm để phục vụ tốt hơn nhu cầu của người ti&ecirc;u d&ugrave;ng. Hiện nay, Colgate-Palmolive đ&atilde; trở th&agrave;nh thương hiệu chăm s&oacute;c sức khỏe răng miệng số 1 tại Mỹ v&agrave; nhiều quốc gia kh&aacute;c.&nbsp;Ra mắt tại Việt Nam từ năm 1998, Colgate-Palmolive Việt Nam đang ph&acirc;n phối đa dạng c&aacute;c d&ograve;ng sản phẩm b&agrave;n chải Colgate, kem đ&aacute;nh răng Colgate, nước s&uacute;c miệng Colgate Plax, sữa tắm Palmolive v&agrave; Protex, dầu gội Palmolive, nước rửa tay Protex, sữa tắm v&agrave; phấn r&ocirc;m Care d&agrave;nh cho b&eacute;... Với xu hướng sản phẩm c&oacute; nguồn gốc từ thi&ecirc;n nhi&ecirc;n, an to&agrave;n, diệt khuẩn,... chăm s&oacute;c v&agrave; bảo vệ to&agrave;n diện sức khỏe gia đ&igrave;nh, Colgate-Palmolive đ&atilde; v&agrave; đang chinh phục tr&aacute;i tim của nhiều gia đ&igrave;nh hiện đại.&nbsp;Colgate - Nhãn hi&ecirc;̣u kem đánh răng s&ocirc;́ 1 th&ecirc;́ giới từ Mỹ.<br><img src=\"https://cdn.tgdd.vn/Products/Images//2491/228733/bhx/files/bo-ban-chai-danh-rang-va-kem-danh-rang-colgate-maxfresh-tinh-chat-than-tre-225g-202401121040472576.jpg\" alt=\"\"></p>\n<h3><strong>Ưu điểm của sản phẩm</strong></h3>\n<p>Bộ b&agrave;n chải đ&aacute;nh răng v&agrave; kem đ&aacute;nh răng Colgate MaxFresh tinh chất than tre bao gồm: 1 b&agrave;n chải đ&aacute;nh răng v&agrave; 1 tu&yacute;p kem đ&aacute;nh răng nh&atilde;n hiệu Colgate, bộ sản phẩm c&oacute; những ưu điểm như:</p>\n<ul>\n<li>\n<p>Với c&aacute;c tinh thể cực trắng s&aacute;ng gi&uacute;p trắng răng c&ugrave;ng hơi thở the m&aacute;t d&agrave;i l&acirc;u gấp 10X*, kem đ&aacute;nh răng Colgate MaxFresh Bamboo Charcoal mang đến cảm gi&aacute;c sảng kho&aacute;i cực độ sau nhiều giờ liền.&nbsp;</p>\n</li>\n<li>\n<p>Tinh chất than tre độc đ&aacute;o kết hợp với c&aacute;c tinh thể cực trắng s&aacute;ng gi&uacute;p l&agrave;m trắng răng vượt trội.&nbsp;</p>\n</li>\n<li>\n<p>Kem đ&aacute;nh răng Colgate gi&uacute;p loại bỏ cặn thức ăn, ngừa s&acirc;u răng đồng thời l&agrave;m trắng răng, cho h&agrave;m răng chắc khỏe, trắng b&oacute;ng tự nhi&ecirc;n</p>\n</li>\n<li>\n<p>C&ocirc;ng thức đặc biệt gi&uacute;p diệt khuẩn hiệu quả, ngừa s&acirc;u răng tối đa, hạn chế mảng b&aacute;m, ngăn ngừa bệnh vi&ecirc;m lợi, thổi b&ugrave;ng cảm gi&aacute;c sảng m&aacute;t lạnh sảng kho&aacute;i khi sử dụng.</p>\n</li>\n<li>\n<p>B&agrave;n chải l&ocirc;ng tơ gi&uacute;p chải sạch s&acirc;u, loại bỏ mảng b&aacute;m v&agrave; vụn thức ăn trong từng kẽ răng, cho bạn h&agrave;m răng chắc khỏe v&agrave; trắng s&aacute;ng. Tay cầm thiết kế vừa vặn, l&agrave;m bằng chất liệu nhựa cao cấp c&oacute; độ đ&agrave;n hồi tốt, kh&ocirc;ng độc hại.</p>\n</li>\n<li>\n<p>Kem đ&aacute;nh răng với tinh chất than tre độc kết hợp c&ugrave;ng c&aacute;c tinh thể cực trắng s&aacute;ng gi&uacute;p l&agrave;m trắng răng hiệu quả v&agrave; hỗ trợ ngăn ngừa s&acirc;u răng, mang lại hơi thở thơm m&aacute;t.<br><img src=\"https://cdn.tgdd.vn/Products/Images//2491/228733/bhx/files/bo-ban-chai-danh-rang-va-kem-danh-rang-colgate-maxfresh-tinh-chat-than-tre-225g-202307191343045386.jpg\" alt=\"\"></p>\n</li>\n</ul>\n<h3><strong>Đối tượng sử dụng</strong></h3>\n<p>B&agrave;n chải đ&aacute;nh răng Colgate với thiết kế l&ocirc;ng b&agrave;n chải si&ecirc;u mảnh, mềm, n&ecirc;n ph&ugrave; hợp với hầu hết mọi đối tượng kể cả nam lẫn nữ, nhất l&agrave; những người c&oacute; răng, nướu nhạy cảm. Kh&ocirc;ng sử dụng cho trẻ em dưới 3 tuổi.</p>\n<p>Kem đ&aacute;nh răng d&ugrave;ng cho cả người lớn v&agrave; trẻ em tr&ecirc;n 6 tuổi.</p>\n<h3><strong>Hướng dẫn sử dụng</strong></h3>\n<ul>\n<li>\n<p>Rửa sạch b&agrave;n chải trước lần sử dụng đầu ti&ecirc;n.</p>\n</li>\n<li>\n<p>L&agrave;m ướt phần l&ocirc;ng b&agrave;n chải, lấy một lượng kem đ&aacute;nh răng vừa đủ v&agrave; lần lượt chải sạch từng v&ugrave;ng răng theo chuyển động tr&ograve;n từ 1 - 2 ph&uacute;t, rồi s&uacute;c miệng sạch.</p>\n</li>\n<li>\n<p>Rửa sạch b&agrave;n chải v&agrave; để kh&ocirc;.</p>\n</li>\n<li>\n<p>Hướng dẫn chải răng đ&uacute;ng c&aacute;ch với b&agrave;n chải Colgate v&agrave; kem đ&aacute;nh răng Colgate:</p>\n<ul>\n<li>\n<p>Chải răng thật kĩ &iacute;t nhất 2 lần mỗi ng&agrave;y hoặc theo hướng dẫn của nha sĩ.</p>\n</li>\n<li>\n<p>D&ugrave;ng &iacute;t nhất 1g kem đ&aacute;nh răng mỗi lần.</p>\n</li>\n<li>\n<p>Trẻ dưới 6 tuổi chỉ n&ecirc;n d&ugrave;ng lượng kem nhỏ bằng hạt đậu, c&oacute; sự hướng dẫn của người lớn để tr&aacute;nh nuốt.</p>\n</li>\n<li>\n<p>S&uacute;c miệng với nước s&uacute;c miệng Colgate Plax sau khi chải răng.</p>\n</li>\n</ul>\n</li>\n</ul>\n<p>&nbsp;** N&ecirc;n kết hợp với b&agrave;n chải Colgate v&agrave; nước s&uacute;c miệng Colgate Plax để bảo vệ răng miệng to&agrave;n diện hơn.<br>&nbsp;** Lưu &yacute;: Trong trường hợp trẻ đang hấp thụ Flouride từ c&aacute;c nguồn kh&aacute;c n&ecirc;n tư vấn nha sĩ b&aacute;c sĩ.<br><img src=\"https://cdn.tgdd.vn/Products/Images//2491/228733/bhx/files/bo-ban-chai-danh-rang-va-kem-danh-rang-colgate-maxfresh-tinh-chat-than-tre-225g-202307191343041032.jpg\" alt=\"\"></p>\n<h3><strong>C&aacute;ch bảo quản v&agrave; lưu &yacute; khi sử dụng bộ b&agrave;n chải đ&aacute;nh răng v&agrave; kem đ&aacute;nh răng Colgate MaxFresh</strong></h3>\n<p>Bảo quản nơi kh&ocirc; r&aacute;o, tho&aacute;ng m&aacute;t, tr&aacute;nh tiếp x&uacute;c với &aacute;nh nắng trực tiếp v&agrave; nhiệt độ cao. Chải răng &iacute;t nhất 2 lần mỗi ng&agrave;y, rửa sạch b&agrave;n chải sau khi sử dụng. N&ecirc;n thay mới b&agrave;n chải đ&aacute;nh răng sau 3 th&aacute;ng sử dụng.</p>\n<p>Trẻ dưới 6 tuổi n&ecirc;n d&ugrave;ng lượng kem nhỏ bằng hạt đậu, c&oacute; sự hướng dẫn của người lớn để tr&aacute;nh nuốt.<br>&nbsp;** Bao b&igrave; sản phẩm c&oacute; thể thay đổi t&ugrave;y theo đợt nhập h&agrave;ng<br>&nbsp;** Hạn sử dụng: 3 năm kể từ ng&agrave;y sản xuất (Xem tr&ecirc;n bao b&igrave;)</p>\n<p>&gt;&gt;&gt;&nbsp;<a href=\"https://www.bachhoaxanh.com/kinh-nghiem-hay/colgate-thuong-hieu-cham-soc-rang-mieng-toan-dien-1165635\">Colgate - Thương hiệu chăm s&oacute;c răng miệng to&agrave;n diện</a></p>\n</div>', '2 năm', 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715995143/got8udbqpi09kslofw2f.jpg', 'Bộ bàn chải đánh răng và kem đánh răng Colgate MaxFresh tinh chất than tre 225g', NULL, 35000, 550, 0, 'chiếc', 10),
(2, b'0', '<table class=\"mt-3 text-14 leading-5 lg:size-full\" style=\"height: 232px; width: 85.7735%;\">\n<tbody>\n<tr>\n<td class=\"whitespace-nowrap border-2 border-[#f1f1f1] bg-[#f4f6f9] px-4 py-2 align-middle\" style=\"width: 28.748%;\">Nơi sản xuất</td>\n<td class=\"w-full border-2 border-DEFAULT px-4 py-2\" style=\"width: 66.7432%;\">\n<div class=\"text-justify\">Việt Nam</div>\n</td>\n</tr>\n<tr>\n<td class=\"whitespace-nowrap border-2 border-[#f1f1f1] bg-[#f4f6f9] px-4 py-2 align-middle\" style=\"width: 28.748%;\">Hạn sử dụng</td>\n<td class=\"w-full border-2 border-DEFAULT px-4 py-2\" style=\"width: 66.7432%;\">\n<div class=\"text-justify\">3 ng&agrave;y kể từ ng&agrave;y sản xuất </div>\n</td>\n</tr>\n<tr>\n<td class=\"whitespace-nowrap border-2 border-[#f1f1f1] bg-[#f4f6f9] px-4 py-2 align-middle\" style=\"width: 28.748%;\">Bảo quản</td>\n<td class=\"w-full border-2 border-DEFAULT px-4 py-2\" style=\"width: 66.7432%;\">\n<div class=\"text-justify\">Bảo quản ở nhiệt độ 0 - 4 độ C</div>\n</td>\n</tr>\n</tbody>\n</table>', '3 ngày', 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715995360/sk4xlie1fpxty4xxlhyn.webp', 'Thịt heo xay', 130000, 98540, 130, 0, 'kg', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_comment`
--

CREATE TABLE `product_comment` (
  `id` bigint NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `created_time` time DEFAULT NULL,
  `star` float DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_comment_image`
--

CREATE TABLE `product_comment_image` (
  `id` bigint NOT NULL,
  `link_image` varchar(255) DEFAULT NULL,
  `product_comment_id` bigint DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_image`
--

CREATE TABLE `product_image` (
  `id` bigint NOT NULL,
  `link_image` varchar(255) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL
);

--
-- Đang đổ dữ liệu cho bảng `product_image`
--

INSERT INTO `product_image` (`id`, `link_image`, `product_id`) VALUES
(1, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715995625/j89fym8ss2qpqfsekx3r.jpg', 1),
(2, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715995626/flidstxkejxowkqvnypm.jpg', 1),
(3, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715995626/zd4jso9ecm8xhaotw5fj.jpg', 1),
(5, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715995677/s575svc0lyfukynlgxvi.jpg', 1),
(6, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1715995688/grsuyyfww0ypdpxqyj4a.webp', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `activation_key` varchar(255) DEFAULT NULL,
  `actived` bit(1) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `remember_key` varchar(255) DEFAULT NULL,
  `token_fcm` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `authority_name` varchar(255) DEFAULT NULL
);

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `activation_key`, `actived`, `created_date`, `email`, `fullname`, `password`, `phone`, `remember_key`, `token_fcm`, `username`, `authority_name`) VALUES
(1, NULL, b'1', '2024-05-17', 'admin@gmail.com', 'ADMIN', '$2a$10$WabnTP/QT9ki8CavW1PDMuYzaBcRiC/aIa2a28bSiiOPyiEkmhJFS', '0932748234', NULL, NULL, 'admin@gmail.com', 'ROLE_ADMIN'),
(2, NULL, b'1', '2024-05-18', 'hieutran02102804@gmail.com', 'Trần Văn Hiếu', '$2a$10$yFy35al7aS6ATAWNimHFi.1iQTGjh0lYV2ZuBlKvToonC2caLQKHK', '0987445231', '784999', NULL, 'hieutran02102804@gmail.com', 'ROLE_USER');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `authority`
--
ALTER TABLE `authority`
  ADD PRIMARY KEY (`name`);

--
-- Chỉ mục cho bảng `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkr2fy24puc3x3sdnla4r1iok1` (`user_id`);

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK3d704slv66tw6x5hmbm6p2x3u` (`product_id`),
  ADD KEY `FKg5uhi8vpsuy0lgloxk2h4w5o6` (`user_id`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `history_pay`
--
ALTER TABLE `history_pay`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK3uqapx8urdm829chr0p30d0y2` (`invoice_id`);

--
-- Chỉ mục cho bảng `import_product`
--
ALTER TABLE `import_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKrb4pegepmxt4xa1n8dmw5mtwv` (`product_id`);

--
-- Chỉ mục cho bảng `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKc8jotskr93810vgn75qlbusw2` (`user_id`);

--
-- Chỉ mục cho bảng `invoice_detail`
--
ALTER TABLE `invoice_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKit1rbx4thcr6gx6bm3gxub3y4` (`invoice_id`),
  ADD KEY `FKbe6c21nke5fy4m3vw00f23qsf` (`product_id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`);

--
-- Chỉ mục cho bảng `product_comment`
--
ALTER TABLE `product_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKf0dvop3xf5orf5j8icdwnq5ak` (`product_id`),
  ADD KEY `FKkg61diec02rh2o3xt4hjiy5u0` (`user_id`);

--
-- Chỉ mục cho bảng `product_comment_image`
--
ALTER TABLE `product_comment_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK9jkf3unia7o8ylu9ar3sgd5py` (`product_comment_id`);

--
-- Chỉ mục cho bảng `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6oo0cvcdtb6qmwsga468uuukk` (`product_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKq6r7e19l5xjmty0j0w6i2inlv` (`authority_name`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `banner`
--
ALTER TABLE `banner`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `blog`
--
ALTER TABLE `blog`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `history_pay`
--
ALTER TABLE `history_pay`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `import_product`
--
ALTER TABLE `import_product`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `invoice_detail`
--
ALTER TABLE `invoice_detail`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `product_comment`
--
ALTER TABLE `product_comment`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product_comment_image`
--
ALTER TABLE `product_comment_image`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `FKkr2fy24puc3x3sdnla4r1iok1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `FK3d704slv66tw6x5hmbm6p2x3u` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FKg5uhi8vpsuy0lgloxk2h4w5o6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `history_pay`
--
ALTER TABLE `history_pay`
  ADD CONSTRAINT `FK3uqapx8urdm829chr0p30d0y2` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`);

--
-- Các ràng buộc cho bảng `import_product`
--
ALTER TABLE `import_product`
  ADD CONSTRAINT `FKrb4pegepmxt4xa1n8dmw5mtwv` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `FKc8jotskr93810vgn75qlbusw2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `invoice_detail`
--
ALTER TABLE `invoice_detail`
  ADD CONSTRAINT `FKbe6c21nke5fy4m3vw00f23qsf` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FKit1rbx4thcr6gx6bm3gxub3y4` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Các ràng buộc cho bảng `product_comment`
--
ALTER TABLE `product_comment`
  ADD CONSTRAINT `FKf0dvop3xf5orf5j8icdwnq5ak` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FKkg61diec02rh2o3xt4hjiy5u0` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `product_comment_image`
--
ALTER TABLE `product_comment_image`
  ADD CONSTRAINT `FK9jkf3unia7o8ylu9ar3sgd5py` FOREIGN KEY (`product_comment_id`) REFERENCES `product_comment` (`id`);

--
-- Các ràng buộc cho bảng `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `FK6oo0cvcdtb6qmwsga468uuukk` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FKq6r7e19l5xjmty0j0w6i2inlv` FOREIGN KEY (`authority_name`) REFERENCES `authority` (`name`);

