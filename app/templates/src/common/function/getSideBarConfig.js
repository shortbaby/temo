/**
 * @fileOverview  获取sideBar的配置
 * @author xuguanlong
 */

'use strict';

import env from '../plugin/env';

export default function () {
	return {
		current: 'home',
		defaultSubActive: '',
		tabs: [
			{
				text: '首页',
				alias: 'home',
				menus: [
					{
						text: '日程管理',
						url: '/home/agenda',
						from: 'local'
					}
				]
			},
			{
				text: '线索管理',
				alias: 'clue',
				menus: [
					{
						text: '我的线索',
						url: '/clue/my',
						from: 'local'
					},
					{
						text: '公共线索',
						url:  '/clue/common',
						from: 'local'
					},
					{
						text: '无效线索',
						url:  '/clue/invalid',
						from: 'local'
					}
				]
			},
			{
				text: '学员档案',
				alias: 'student',
				menus: [
					{
						text: '我的学生',
						url: '/student/my',
						from: 'local'
					},
					{
						text: '学生档案',
						url:  '/student/common',
						from: 'local'
					}
				]
			},
			{
				text: '课程管理',
				alias: 'course',
				menus: [
					{
						text: '课程列表',
						url: '/course/list',
						from: 'local'
					},
					{
						text: '课程分类',
						url: '/course/category',
						from: 'local'
					}
				]
			},
			{
				text: '教务管理',
				alias: 'educational',
				menus: [
					{
						text: '待排课班级',
						url: '/educational/course',
						from: 'local'
					},
					{
						text: '课表',
						url:  '/educational/timetable',
						from: 'local'
					},
					{
						text: '签到',
						url:  '/educational/sign',
						from: 'local'
					}
				]
			},
			{
				text: '系统设置',
				alias: 'setting',
				menus: [
					{
						text: '老师考勤',
						url: '/setting/attendance',
						from: 'local'
					},
					{
						text: '校区管理',
						url: '/setting/school',
						from: 'local'
					},
					{
						text: '职位管理',
						url: '/setting/role',
						from: 'local'
					},
					{
						text: '用户管理',
						url: '/setting/user',
						from: 'local'
					},
					{
						text: '老师管理',
						url: '/setting/teacher',
						from: 'local'
					},
					{
						text: '教室管理',
						url: '/setting/classroom',
						from: 'local'
					},
					{
						text: '线索渠道设置',
						url: '/setting/channel',
						from: 'local'
					},
					{
						text: '基础参数设置',
						url: '/setting/parameter',
						from: 'local'
					}
				]
			},
			{
				text: '财务管理',
				alias: 'financial',
				menus: [
					{
						text: '添加合同',
						url: '/financial/add',
						from: 'local'
					},
					{
						text: '合同列表',
						url:  '/financial/list',
						from: 'local'
					},
					{
						text: '退费记录',
						url:  '/financial/refund',
						from: 'local'
					}
				]
			},
			{
				text: '作业管理',
				alias: 'homework',
				menus: [
					{
						text: '题库',
						url: '/homework/question',
						from: 'local'
					},
					{
						text: '布置作业',
						url:  '/homework/arrangement',
						from: 'local'
					},
					{
						text: '作业列表',
						url:  '/homework/list',
						from: 'local'
					}
				]
			},
			{
				text: '家校通',
				alias: 'wechat',
				menus: [
					{
						text: '微信认证',
						url: '/wechat/bind',
						from: 'local'
					},
					{
						text: '微信粉丝',
						url:  '/wechat/fans',
						from: 'local'
					}
				]
			},
			{
				text: '操作记录',
				alias: 'log',
				url: '/log/history',
				menus: [
				]
			}
		]
	};
}