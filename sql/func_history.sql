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

 Date: 18/01/2023 11:11:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for func_history
-- ----------------------------
DROP TABLE IF EXISTS `func_history`;
CREATE TABLE `func_history`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `p_id` int(0) NULL DEFAULT NULL COMMENT '民警id',
  `p_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '民警姓名',
  `content` int(0) NULL DEFAULT NULL COMMENT '内容',
  `t_start` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '开始年月',
  `t_end` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '结束年月',
  `score` decimal(10, 2) NULL DEFAULT NULL COMMENT '积分',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '履历表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of func_history
-- ----------------------------
INSERT INTO `func_history` VALUES (22, 3, '吴文奇', 2, '202001', '202202', 0.50, '担任副科长级及以上干部（区管干部）与中层正职重叠的时间段，重复的时间段就高计分，故需要扣除1年0个月的中层正职得分，合计1.0-0.5=0.5', '2023-01-09 16:18:11');
INSERT INTO `func_history` VALUES (23, 3, '吴文奇', 1, '202101', '', 1.50, '担任副科长级及以上干部（区管干部）与中层正职重叠的时间段，重复的时间段就高计分，故需要扣除1年0个月的中层正职得分，合计2.0-0.5=1.5', '2023-01-09 16:19:23');
INSERT INTO `func_history` VALUES (25, 3, '吴文奇', 3, '201001', '202001', 3.00, '中层副职10年0个月，得分3.0', '2023-01-09 16:23:20');
INSERT INTO `func_history` VALUES (28, 3, '吴文奇', 10, '200009', '', 0.50, '警务技术序列民警取得警务技术一级主管资格前获得警务技术职务副高级任职资格5年1个月，得分0.5', '2023-01-09 16:56:58');
INSERT INTO `func_history` VALUES (29, 3, '吴文奇', 4, '200801', '201001', 0.40, '任一级警长（警务技术一级主管）后，仍在派出所工作，2年0个月，得分0.4', '2023-01-09 16:57:56');
INSERT INTO `func_history` VALUES (31, 5, '许锋', 1, '201101', '201205', 1.33, '担任副科长级及以上干部（区管干部）1年4个月，得分1.33', '2023-01-16 14:33:20');

SET FOREIGN_KEY_CHECKS = 1;
