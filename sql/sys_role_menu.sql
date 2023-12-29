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

 Date: 18/01/2023 11:11:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` bigint(0) NOT NULL COMMENT '角色ID',
  `menu_id` bigint(0) NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 125 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色菜单表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (3, 3, 1);
INSERT INTO `sys_role_menu` VALUES (4, 3, 2);
INSERT INTO `sys_role_menu` VALUES (5, 3, 10);
INSERT INTO `sys_role_menu` VALUES (6, 3, 12);
INSERT INTO `sys_role_menu` VALUES (7, 3, 11);
INSERT INTO `sys_role_menu` VALUES (8, 3, 23);
INSERT INTO `sys_role_menu` VALUES (9, 3, 5);
INSERT INTO `sys_role_menu` VALUES (10, 3, 20);
INSERT INTO `sys_role_menu` VALUES (11, 3, 21);
INSERT INTO `sys_role_menu` VALUES (12, 3, 22);
INSERT INTO `sys_role_menu` VALUES (13, 3, 3);
INSERT INTO `sys_role_menu` VALUES (14, 3, 13);
INSERT INTO `sys_role_menu` VALUES (15, 3, 14);
INSERT INTO `sys_role_menu` VALUES (16, 3, 15);
INSERT INTO `sys_role_menu` VALUES (17, 3, 4);
INSERT INTO `sys_role_menu` VALUES (18, 3, 16);
INSERT INTO `sys_role_menu` VALUES (19, 3, 17);
INSERT INTO `sys_role_menu` VALUES (20, 3, 18);
INSERT INTO `sys_role_menu` VALUES (21, 3, 19);
INSERT INTO `sys_role_menu` VALUES (23, 3, 25);
INSERT INTO `sys_role_menu` VALUES (24, 3, 26);
INSERT INTO `sys_role_menu` VALUES (34, 3, 27);
INSERT INTO `sys_role_menu` VALUES (35, 3, 30);
INSERT INTO `sys_role_menu` VALUES (36, 3, 28);
INSERT INTO `sys_role_menu` VALUES (37, 3, 29);
INSERT INTO `sys_role_menu` VALUES (49, 3, 40);
INSERT INTO `sys_role_menu` VALUES (50, 3, 41);
INSERT INTO `sys_role_menu` VALUES (51, 3, 42);
INSERT INTO `sys_role_menu` VALUES (52, 3, 43);
INSERT INTO `sys_role_menu` VALUES (53, 3, 44);
INSERT INTO `sys_role_menu` VALUES (71, 3, 50);
INSERT INTO `sys_role_menu` VALUES (72, 3, 51);
INSERT INTO `sys_role_menu` VALUES (73, 3, 52);
INSERT INTO `sys_role_menu` VALUES (74, 3, 53);
INSERT INTO `sys_role_menu` VALUES (75, 3, 37);
INSERT INTO `sys_role_menu` VALUES (76, 3, 39);
INSERT INTO `sys_role_menu` VALUES (77, 3, 54);
INSERT INTO `sys_role_menu` VALUES (78, 3, 55);
INSERT INTO `sys_role_menu` VALUES (79, 3, 56);
INSERT INTO `sys_role_menu` VALUES (80, 3, 57);
INSERT INTO `sys_role_menu` VALUES (81, 3, 58);
INSERT INTO `sys_role_menu` VALUES (82, 3, 59);
INSERT INTO `sys_role_menu` VALUES (83, 3, 60);
INSERT INTO `sys_role_menu` VALUES (84, 3, 61);
INSERT INTO `sys_role_menu` VALUES (85, 3, 62);
INSERT INTO `sys_role_menu` VALUES (86, 3, 63);
INSERT INTO `sys_role_menu` VALUES (87, 3, 64);
INSERT INTO `sys_role_menu` VALUES (88, 3, 65);
INSERT INTO `sys_role_menu` VALUES (89, 6, 61);
INSERT INTO `sys_role_menu` VALUES (90, 6, 62);
INSERT INTO `sys_role_menu` VALUES (91, 6, 63);
INSERT INTO `sys_role_menu` VALUES (92, 6, 64);
INSERT INTO `sys_role_menu` VALUES (93, 6, 65);
INSERT INTO `sys_role_menu` VALUES (94, 3, 66);
INSERT INTO `sys_role_menu` VALUES (95, 3, 67);
INSERT INTO `sys_role_menu` VALUES (96, 3, 68);
INSERT INTO `sys_role_menu` VALUES (97, 6, 66);
INSERT INTO `sys_role_menu` VALUES (98, 6, 67);
INSERT INTO `sys_role_menu` VALUES (99, 6, 68);
INSERT INTO `sys_role_menu` VALUES (100, 3, 69);
INSERT INTO `sys_role_menu` VALUES (101, 6, 69);
INSERT INTO `sys_role_menu` VALUES (102, 3, 70);
INSERT INTO `sys_role_menu` VALUES (103, 3, 71);
INSERT INTO `sys_role_menu` VALUES (104, 3, 72);
INSERT INTO `sys_role_menu` VALUES (105, 3, 73);
INSERT INTO `sys_role_menu` VALUES (106, 6, 70);
INSERT INTO `sys_role_menu` VALUES (107, 6, 71);
INSERT INTO `sys_role_menu` VALUES (108, 6, 72);
INSERT INTO `sys_role_menu` VALUES (109, 6, 73);
INSERT INTO `sys_role_menu` VALUES (110, 3, 78);
INSERT INTO `sys_role_menu` VALUES (111, 3, 79);
INSERT INTO `sys_role_menu` VALUES (112, 3, 80);
INSERT INTO `sys_role_menu` VALUES (113, 3, 81);
INSERT INTO `sys_role_menu` VALUES (114, 3, 82);
INSERT INTO `sys_role_menu` VALUES (115, 6, 82);
INSERT INTO `sys_role_menu` VALUES (116, 3, 84);
INSERT INTO `sys_role_menu` VALUES (117, 3, 85);
INSERT INTO `sys_role_menu` VALUES (118, 3, 86);
INSERT INTO `sys_role_menu` VALUES (119, 3, 87);
INSERT INTO `sys_role_menu` VALUES (120, 3, 83);
INSERT INTO `sys_role_menu` VALUES (121, 6, 84);
INSERT INTO `sys_role_menu` VALUES (122, 6, 85);
INSERT INTO `sys_role_menu` VALUES (123, 6, 86);
INSERT INTO `sys_role_menu` VALUES (124, 6, 87);

SET FOREIGN_KEY_CHECKS = 1;
