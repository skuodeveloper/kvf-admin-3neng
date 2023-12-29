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

 Date: 18/01/2023 11:11:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `parent_id` bigint(0) NOT NULL COMMENT '父菜单ID。一级菜单为0',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单名称',
  `url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '菜单URL',
  `permission` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '授权标识。多个用逗号分隔，如：user:list,user:create',
  `type` tinyint(0) NULL DEFAULT NULL COMMENT '类型。0：目录；1：菜单；2：按钮；3：导航菜单',
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `status` tinyint(0) NOT NULL DEFAULT 0 COMMENT '状态。0：正常；1：禁用',
  `sort` int(0) NOT NULL DEFAULT 0 COMMENT '排序值。越小越靠前',
  `create_by` bigint(0) NULL DEFAULT NULL COMMENT '创建人',
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 88 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '菜单表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, 0, '系统管理', NULL, '', 0, 'fa fa-cogs', 0, 0, NULL, '2019-05-06 21:46:33');
INSERT INTO `sys_menu` VALUES (2, 1, '用户管理', 'sys/user/index', 'sys:user:index', 1, NULL, 0, 0, NULL, '2019-05-06 21:46:47');
INSERT INTO `sys_menu` VALUES (3, 1, '菜单管理', 'sys/menu/index', 'sys:menu:index', 1, NULL, 0, 2, NULL, '2019-05-11 11:50:57');
INSERT INTO `sys_menu` VALUES (4, 1, '角色管理', 'sys/role/index', 'sys:role:index', 1, NULL, 0, 3, NULL, '2019-05-11 11:51:31');
INSERT INTO `sys_menu` VALUES (5, 1, '部门管理', 'sys/dept/index', 'sys:dept:index', 1, NULL, 0, 1, NULL, '2019-05-11 11:51:58');
INSERT INTO `sys_menu` VALUES (7, 0, '系统审计', NULL, '', 0, 'fa fa-industry', 0, 1, NULL, '2019-05-11 12:04:09');
INSERT INTO `sys_menu` VALUES (9, 7, '操作日志', 'sys/log/index', 'sys:log:index', 1, NULL, 0, 0, NULL, '2019-05-11 13:26:02');
INSERT INTO `sys_menu` VALUES (10, 2, '添加', NULL, 'sys:user:add', 2, NULL, 0, 0, NULL, '2019-05-07 21:25:46');
INSERT INTO `sys_menu` VALUES (11, 2, '删除', NULL, 'sys:user:del', 2, NULL, 0, 2, NULL, '2019-05-11 14:26:54');
INSERT INTO `sys_menu` VALUES (12, 2, '编辑', NULL, 'sys:user:edit', 2, NULL, 0, 1, NULL, '2019-05-11 14:28:06');
INSERT INTO `sys_menu` VALUES (13, 3, '添加', NULL, 'sys:menu:add', 2, NULL, 0, 0, NULL, '2019-05-11 14:28:59');
INSERT INTO `sys_menu` VALUES (14, 3, '编辑', NULL, 'sys:menu:edit', 2, NULL, 0, 1, NULL, '2019-05-11 14:29:35');
INSERT INTO `sys_menu` VALUES (15, 3, '删除', NULL, 'sys:menu:del', 2, NULL, 0, 2, NULL, '2019-05-11 14:29:55');
INSERT INTO `sys_menu` VALUES (16, 4, '添加', NULL, 'sys:role:add', 2, NULL, 0, 0, NULL, '2019-05-11 14:30:07');
INSERT INTO `sys_menu` VALUES (17, 4, '编辑', NULL, 'sys:role:edit', 2, NULL, 0, 1, NULL, '2019-05-11 14:30:28');
INSERT INTO `sys_menu` VALUES (18, 4, '删除', NULL, 'sys:role:del', 2, NULL, 0, 2, NULL, '2019-05-11 14:30:37');
INSERT INTO `sys_menu` VALUES (19, 4, '权限设置', NULL, 'sys:role:permission', 2, NULL, 0, 3, NULL, '2019-05-11 14:30:37');
INSERT INTO `sys_menu` VALUES (20, 5, '添加', NULL, 'sys:dept:add', 2, NULL, 0, 0, NULL, '2019-05-11 14:30:47');
INSERT INTO `sys_menu` VALUES (21, 5, '编辑', NULL, 'sys:dept:edit', 2, NULL, 0, 1, NULL, '2019-05-11 14:30:58');
INSERT INTO `sys_menu` VALUES (22, 5, '删除', NULL, 'sys:dept:del', 2, NULL, 0, 2, NULL, '2019-05-11 14:31:13');
INSERT INTO `sys_menu` VALUES (23, 2, '重置密码', NULL, 'sys:user:reset', 2, NULL, 0, 3, NULL, '2019-05-12 18:01:10');
INSERT INTO `sys_menu` VALUES (24, 0, 'Druid监控', 'druid/index.html', NULL, 3, 'fa fa-eye', 0, 0, NULL, '2019-05-20 22:43:09');
INSERT INTO `sys_menu` VALUES (25, 0, '代码生成', '', NULL, 0, 'fa fa-bolt', 0, 2, NULL, '2019-06-10 22:47:31');
INSERT INTO `sys_menu` VALUES (26, 25, '生成管理', 'generator/table/index', 'gen:table:index', 1, NULL, 0, 0, NULL, '2019-06-10 22:50:09');
INSERT INTO `sys_menu` VALUES (27, 1, '字典管理', 'sys/dict/index', 'sys:dict:index', 1, NULL, 0, 4, NULL, '2019-08-12 09:47:31');
INSERT INTO `sys_menu` VALUES (28, 27, '添加', NULL, 'sys:dict:add', 2, NULL, 0, 0, NULL, '2019-08-12 09:48:03');
INSERT INTO `sys_menu` VALUES (29, 27, '编辑', NULL, 'sys:dict:edit', 2, NULL, 0, 0, NULL, '2019-08-12 09:48:20');
INSERT INTO `sys_menu` VALUES (30, 27, '删除', NULL, 'sys:dict:del', 2, NULL, 0, 0, NULL, '2019-08-12 09:48:45');
INSERT INTO `sys_menu` VALUES (37, 0, '组件管理', NULL, NULL, 0, 'fa fa-th-large', 0, 3, NULL, '2020-03-31 11:14:02');
INSERT INTO `sys_menu` VALUES (38, 37, '富文本', 'sys/component/ueditor/index', 'component:ueditor:index', 1, NULL, 0, 1, NULL, '2020-03-31 11:17:55');
INSERT INTO `sys_menu` VALUES (39, 37, '图标库', 'sys/component/icons/index', 'component:icons:index', 1, NULL, 0, 0, NULL, '2020-03-31 11:22:09');
INSERT INTO `sys_menu` VALUES (40, 0, '三能积分', '', NULL, 0, 'fa fa-american-sign-language-interpreting', 0, 4, NULL, '2021-01-28 14:43:30');
INSERT INTO `sys_menu` VALUES (41, 40, '民警管理', 'func/police/index', 'func:police:index', 1, NULL, 0, 0, NULL, '2021-01-28 14:44:06');
INSERT INTO `sys_menu` VALUES (42, 41, '新增', NULL, 'func:police:add', 2, NULL, 0, 0, NULL, '2021-01-29 13:54:30');
INSERT INTO `sys_menu` VALUES (43, 41, '编辑', NULL, 'func:police:edit', 2, NULL, 0, 1, NULL, '2021-01-29 13:54:42');
INSERT INTO `sys_menu` VALUES (44, 41, '删除', NULL, 'func:police:del', 2, NULL, 0, 2, NULL, '2021-01-29 13:54:54');
INSERT INTO `sys_menu` VALUES (50, 40, '指标管理', 'func/zhibiao/index', 'func:zhibiao:index', 1, NULL, 0, 1, NULL, '2022-05-11 16:34:42');
INSERT INTO `sys_menu` VALUES (51, 50, '新增', NULL, 'func:zhibiao:add', 2, NULL, 0, 0, NULL, '2022-05-11 16:35:43');
INSERT INTO `sys_menu` VALUES (52, 50, '编辑', NULL, 'func:zhibiao:edit', 2, NULL, 0, 1, NULL, '2022-05-11 16:36:01');
INSERT INTO `sys_menu` VALUES (53, 50, '删除', NULL, 'func:zhibiao:del', 2, NULL, 0, 2, NULL, '2022-05-11 16:36:16');
INSERT INTO `sys_menu` VALUES (54, 50, '赋分', NULL, 'func:zhibiaoRule:index', 2, NULL, 0, 3, NULL, '2022-05-12 16:50:47');
INSERT INTO `sys_menu` VALUES (55, 50, '赋分规则新增', NULL, 'func:zhibiaoRule:add', 2, NULL, 0, 4, NULL, '2022-05-13 11:00:09');
INSERT INTO `sys_menu` VALUES (56, 50, '赋分规则编辑', NULL, 'func:zhibiaoRule:edit', 2, NULL, 0, 5, NULL, '2022-05-13 11:00:39');
INSERT INTO `sys_menu` VALUES (57, 50, '赋分规则删除', NULL, 'func:zhibiaoRule:del', 2, NULL, 0, 6, NULL, '2022-05-13 11:00:57');
INSERT INTO `sys_menu` VALUES (58, 41, '赋分记录', NULL, 'func:fufenRecord:index', 2, NULL, 0, 3, NULL, '2022-05-13 15:26:37');
INSERT INTO `sys_menu` VALUES (59, 41, '新增赋分', NULL, 'func:fufenRecord:add', 2, NULL, 0, 4, NULL, '2022-05-13 15:27:15');
INSERT INTO `sys_menu` VALUES (60, 41, '删除赋分', NULL, 'func:fufenRecord:del', 2, NULL, 0, 5, NULL, '2022-05-13 15:27:43');
INSERT INTO `sys_menu` VALUES (61, 0, '职务晋升', '', NULL, 0, 'fa fa-bug', 0, 5, NULL, '2023-01-04 14:57:09');
INSERT INTO `sys_menu` VALUES (62, 61, '民警管理', 'func/policeInfo/index', 'func:policeInfo:index', 1, NULL, 0, 0, NULL, '2023-01-04 14:57:51');
INSERT INTO `sys_menu` VALUES (63, 62, '新增', NULL, 'func:policeInfo:add', 2, NULL, 0, 0, NULL, '2023-01-04 16:38:27');
INSERT INTO `sys_menu` VALUES (64, 62, '编辑', NULL, 'func:policeInfo:edit', 2, NULL, 0, 1, NULL, '2023-01-04 16:38:41');
INSERT INTO `sys_menu` VALUES (65, 62, '删除', NULL, 'func:policeInfo:del', 2, NULL, 0, 2, NULL, '2023-01-04 16:38:52');
INSERT INTO `sys_menu` VALUES (66, 62, '履历新增', NULL, 'func:history:add', 2, NULL, 0, 3, NULL, '2023-01-05 15:22:35');
INSERT INTO `sys_menu` VALUES (67, 62, '履历编辑', NULL, 'func:history:edit', 2, NULL, 0, 4, NULL, '2023-01-05 15:23:09');
INSERT INTO `sys_menu` VALUES (68, 62, '履历删除', NULL, 'func:history:del', 2, NULL, 0, 5, NULL, '2023-01-05 15:33:56');
INSERT INTO `sys_menu` VALUES (69, 62, '履历', NULL, 'func:history:index', 2, NULL, 0, 6, NULL, '2023-01-05 15:43:45');
INSERT INTO `sys_menu` VALUES (70, 62, '业绩新增', NULL, 'func:achievement:add', 2, NULL, 0, 7, NULL, '2023-01-10 14:44:31');
INSERT INTO `sys_menu` VALUES (71, 62, '业绩编辑', NULL, 'func:achievement:edit', 2, NULL, 0, 8, NULL, '2023-01-10 14:44:48');
INSERT INTO `sys_menu` VALUES (72, 62, '业绩删除', NULL, 'func:achievement:del', 2, NULL, 0, 9, NULL, '2023-01-10 14:45:04');
INSERT INTO `sys_menu` VALUES (73, 62, '业绩', NULL, 'func:achievement:index', 2, NULL, 0, 10, NULL, '2023-01-10 14:45:17');
INSERT INTO `sys_menu` VALUES (78, 61, '奖励审核', 'func/achievement/index1', 'func:achievement:index', 1, NULL, 0, 1, NULL, '2023-01-12 09:03:47');
INSERT INTO `sys_menu` VALUES (79, 62, '惩戒新增', NULL, 'func:punish:add', 2, NULL, 0, 11, NULL, '2023-01-13 14:05:27');
INSERT INTO `sys_menu` VALUES (80, 62, '惩戒编辑', NULL, 'func:punish:edit', 2, NULL, 0, 12, NULL, '2023-01-13 14:06:01');
INSERT INTO `sys_menu` VALUES (81, 62, '惩戒删除', NULL, 'func:punish:del', 2, NULL, 0, 13, NULL, '2023-01-13 14:06:31');
INSERT INTO `sys_menu` VALUES (82, 62, '惩戒', NULL, 'func:punish:index', 2, NULL, 0, 14, NULL, '2023-01-13 14:06:50');
INSERT INTO `sys_menu` VALUES (83, 61, '年度考核', 'func/yearTest/index1', 'func:yearTest:index', 1, NULL, 0, 2, NULL, '2023-01-13 15:31:48');
INSERT INTO `sys_menu` VALUES (84, 62, '考核新增', NULL, 'func:yearTest:add', 2, NULL, 0, 15, NULL, '2023-01-13 15:38:02');
INSERT INTO `sys_menu` VALUES (85, 62, '考核编辑', NULL, 'func:yearTest:edit', 2, NULL, 0, 16, NULL, '2023-01-13 15:38:23');
INSERT INTO `sys_menu` VALUES (86, 62, '考核删除', NULL, 'func:yearTest:del', 2, NULL, 0, 17, NULL, '2023-01-13 15:38:46');
INSERT INTO `sys_menu` VALUES (87, 62, '考核', NULL, 'func:yearTest:index', 2, NULL, 0, 18, NULL, '2023-01-13 15:39:04');

SET FOREIGN_KEY_CHECKS = 1;
