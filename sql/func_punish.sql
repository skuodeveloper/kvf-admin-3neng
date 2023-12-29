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

 Date: 18/01/2023 11:11:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for func_punish
-- ----------------------------
DROP TABLE IF EXISTS `func_punish`;
CREATE TABLE `func_punish`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `p_id` int(0) NULL DEFAULT NULL COMMENT '警员id',
  `p_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '警员姓名',
  `content` int(0) NULL DEFAULT NULL COMMENT '惩戒内容',
  `gg_time` date NULL DEFAULT NULL COMMENT '惩戒时间',
  `score` decimal(10, 2) NULL DEFAULT NULL COMMENT '分值',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '惩戒表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of func_punish
-- ----------------------------
INSERT INTO `func_punish` VALUES (2, 3, '吴文奇', 1, '2023-01-13', 10.00, '2023-01-13 14:40:27');
INSERT INTO `func_punish` VALUES (3, 3, '吴文奇', 2, '2023-01-09', 2.00, '2023-01-16 14:25:37');
INSERT INTO `func_punish` VALUES (4, 5, '许锋', 2, '2023-01-16', 12.00, '2023-01-16 16:45:46');

SET FOREIGN_KEY_CHECKS = 1;
