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

 Date: 18/01/2023 11:11:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `dept_id` bigint(0) NOT NULL COMMENT '归属部门',
  `username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '登录名',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `realname` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '姓名',
  `sex` tinyint(0) NOT NULL DEFAULT 0 COMMENT '性别。0：未知；1：男；2：女',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号码',
  `tel` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '固定电话',
  `email` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `avatar` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户头像',
  `job_title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '职务名称',
  `status` tinyint(0) NOT NULL DEFAULT 0 COMMENT '用户状态。0：正常；1：禁用',
  `sort` int(0) NOT NULL DEFAULT 0 COMMENT '排序。值越小越靠前',
  `del_flag` int(0) NOT NULL DEFAULT 0 COMMENT '删除标识。0：未删除；1：已删除',
  `create_by` bigint(0) NULL DEFAULT NULL COMMENT '创建人',
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 5, 'admin', '7cc2cf8a95f80a8ea500ff997f9623e4', '系统管理员', 1, '18218798428', '123', '123', 'avatar/20210128/微信图片_20210127175240.jpg', '超级管理员', 0, 0, 0, NULL, '2023-01-04 16:51:42', '2019-04-30 22:44:17');
INSERT INTO `sys_user` VALUES (5, 15, '330402198210043015', 'e10adc3949ba59abbe56e057f20f883e', '吴文奇', 1, '13750754543', '13750754543', NULL, NULL, NULL, 0, 0, 0, 1, '2023-01-05 09:59:22', '2023-01-05 09:59:22');
INSERT INTO `sys_user` VALUES (6, 15, '330402198810231230', 'e10adc3949ba59abbe56e057f20f883e', '许锋', 1, '13711112222', '13711112222', NULL, NULL, NULL, 0, 0, 0, 1, '2023-01-05 14:51:17', '2023-01-05 14:51:17');

SET FOREIGN_KEY_CHECKS = 1;
