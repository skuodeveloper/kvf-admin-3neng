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

 Date: 18/01/2023 11:10:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for func_achievement
-- ----------------------------
DROP TABLE IF EXISTS `func_achievement`;
CREATE TABLE `func_achievement`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `p_id` int(0) NULL DEFAULT NULL COMMENT '警员id',
  `p_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '警员姓名',
  `content` int(0) NULL DEFAULT NULL COMMENT '奖励名称',
  `gg_time` date NULL DEFAULT NULL COMMENT '获取时间',
  `file_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '附件地址',
  `score` decimal(10, 2) NULL DEFAULT NULL COMMENT '分值',
  `status` int(0) NULL DEFAULT NULL COMMENT '状态',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '审核时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '奖励表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of func_achievement
-- ----------------------------
INSERT INTO `func_achievement` VALUES (22, 3, '吴文奇', 1, '2023-01-13', '/common/static/doc/20230113/移动警务终端权限申请表_57398.xlsx', 9.00, 1, '2023-01-13 10:06:11', '2023-01-13 10:25:40');
INSERT INTO `func_achievement` VALUES (23, 5, '许锋', 2, '2023-01-16', '/common/static/doc/20230116/移动警务终端权限申请表.xlsx', 9.00, 1, '2023-01-16 16:27:05', '2023-01-16 16:38:06');
INSERT INTO `func_achievement` VALUES (24, 5, '许锋', 5, '2023-01-16', '/common/static/doc/20230116/浙江省公安厅重点人员管控技术标准V3.15.doc', 15.00, 1, '2023-01-16 16:40:05', '2023-01-16 16:40:25');
INSERT INTO `func_achievement` VALUES (25, 3, '吴文奇', 5, '2022-12-17', '/common/static/doc/20230117/吴文奇.doc', 15.00, 1, '2023-01-17 15:23:26', '2023-01-17 15:25:25');

SET FOREIGN_KEY_CHECKS = 1;
