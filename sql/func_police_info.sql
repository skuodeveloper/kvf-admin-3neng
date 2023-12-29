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

 Date: 18/01/2023 11:11:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for func_police_info
-- ----------------------------
DROP TABLE IF EXISTS `func_police_info`;
CREATE TABLE `func_police_info`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `xm` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `sfzh` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '身份证号',
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话号码',
  `dept_id` int(0) NULL DEFAULT NULL COMMENT '部门id',
  `dept` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部门名称',
  `xb` int(0) NULL DEFAULT NULL COMMENT '性别',
  `csny` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '出生年月',
  `cjgzny` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '参加工作年月',
  `cjgany` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '参加公安年月',
  `jwxl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '警务序列：执法勤务、警务技术',
  `yjny` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '任一级警长、警务技术一级主管年月',
  `pass` int(0) NULL DEFAULT NULL COMMENT '审核',
  `create_time` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '民警基础信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of func_police_info
-- ----------------------------
INSERT INTO `func_police_info` VALUES (3, '吴文奇', '330402198210043015', '13750754543', 15, '技术与数据服务中心', 2, '198210', '198210', '198210', '2', '200510', 0, '2023-01-16 15:12:29');
INSERT INTO `func_police_info` VALUES (5, '许锋', '330402198810231230', '13711112222', 15, '技术与数据服务中心', 1, '198810', '198810', '198810', '1', '198810', 0, '2023-01-05 16:07:54');

SET FOREIGN_KEY_CHECKS = 1;
