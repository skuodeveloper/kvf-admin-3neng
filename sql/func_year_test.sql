/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : kvf_admin_3neng

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 18/01/2023 11:11:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for func_year_test
-- ----------------------------
DROP TABLE IF EXISTS `func_year_test`;
CREATE TABLE `func_year_test`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `p_id` int(0) NULL DEFAULT NULL COMMENT '警员id',
  `p_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '警员姓名',
  `content` int(0) NULL DEFAULT NULL COMMENT '考核结果',
  `gg_time` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考核年度',
  `score` decimal(10, 2) NULL DEFAULT NULL COMMENT '分值',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '年度考核表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of func_year_test
-- ----------------------------
INSERT INTO `func_year_test` VALUES (4, 3, '吴文奇', 2, '2023', NULL, '2023-01-16 15:17:49');
INSERT INTO `func_year_test` VALUES (5, 3, '吴文奇', 4, '2016', NULL, '2023-01-16 15:55:45');
INSERT INTO `func_year_test` VALUES (7, 5, '许锋', 3, '2017', NULL, '2023-01-16 16:11:02');
INSERT INTO `func_year_test` VALUES (8, 3, '吴文奇', 6, '2021', NULL, '2023-01-16 16:14:07');
INSERT INTO `func_year_test` VALUES (9, 5, '许锋', 1, '2023', NULL, '2023-01-16 16:24:32');
INSERT INTO `func_year_test` VALUES (10, 3, '吴文奇', 2, '2018', NULL, '2023-01-16 17:00:26');

SET FOREIGN_KEY_CHECKS = 1;
