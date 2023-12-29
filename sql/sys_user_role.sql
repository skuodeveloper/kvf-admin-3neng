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

 Date: 18/01/2023 11:12:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint(0) NULL DEFAULT NULL COMMENT '用户ID',
  `role_id` bigint(0) NULL DEFAULT NULL COMMENT '角色ID',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户与角色对应关系' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 1, 3, '2019-05-09 22:06:16');
INSERT INTO `sys_user_role` VALUES (2, 2, 5, '2019-05-10 21:25:08');
INSERT INTO `sys_user_role` VALUES (3, 3, 4, '2019-05-10 21:25:08');
INSERT INTO `sys_user_role` VALUES (4, 4, 6, '2023-01-05 09:56:16');
INSERT INTO `sys_user_role` VALUES (5, 5, 6, '2023-01-05 09:59:22');
INSERT INTO `sys_user_role` VALUES (6, 6, 6, '2023-01-05 14:51:17');

SET FOREIGN_KEY_CHECKS = 1;
