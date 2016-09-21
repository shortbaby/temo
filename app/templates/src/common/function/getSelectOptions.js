/**
 * @fileOverview  获取选择列表的枚举
 * @author xuguanlong
 */

'use strict';


export default function() {
    return {
    	blankItem: {
    		value: '-1',
    		label: '请选择'
    	},
    	unAllocate: {
    		value: '0',
    		label: '未分配'
    	},
        searchFieldOptions: [
	        {
	            value: 'name',
	            label: '学员姓名'
	        },
	        {
	            value: 'mobile',
	            label: '学员手机'
	        },
	        {
	            value: 'parentName',
	            label: '家长姓名'
	        },
	        {
	            value: 'parentMobile',
	            label: '家长手机'
	        }
	    ],
	    consultStatusOptions: [
	    	{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '未联系上'
			},
			{
				value: '1',
				label: '预约来访'
			},
			{
				value: '2',
				label: '已到访'
			},
			{
				value: '3',
				label: '多次到访'
			}

		],
		followFieldOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
	            value: '0',
	            label: '电话跟进'
	        },
	        {
	            value: '1',
	            label: '当面沟通'
	        },
	        {
	            value: '2',
	            label: '微信沟通'
	        },
	        {
	            value: '3',
	            label: 'QQ沟通'
	        },
	        {
	            value: '4',
	            label: '其他'
	        }
		],
		belongToOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
	            value: '0',
	            label: '个人线索'
	        },
	        {
	            value: '1',
	            label: '公共线索'
	        }
		],
		originOptions: [
			{
	            value: '0',
	            label: '市场部'
	        },
	        {
	            value: '1',
	            label: '推荐'
	        }
		],
		availableTimeOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '9:30~11:30'
			},
			{
				value: '1',
				label: '13:00~15:00'
			},
			{
				value: '2',
				label: '15:30~17:30'
			},
			{
				value: '3',
				label: '18:00~20:00'
			}
		],
		relationshipOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '父亲'
			},
			{
				value: '1',
				label: '母亲'
			},
			{
				value: '2',
				label: '其他'
			}
		],
		genderOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '男'
			},
			{
				value: '1',
				label: '女'
			},
			{
				value: '2',
				label: '其他'
			}
		],
		followPlanOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '未联系上'
			},
			{
				value: '1',
				label: '稍后联系'
			},
			{
				value: '2',
				label: '邀约一次到访'
			},
			{
				value: '3',
				label: '邀约二次到访'
			}
		],
		hasDepositeOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '否'
			},
			{
				value: '1',
				label: '是'
			}
		],
		accountStatusOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '冻结'
			},
			{
				value: '1',
				label: '正常'
			}
		],
		studentBrowseTypeOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '在读学员'
			},
			{
				value: '1',
				label: '往期学员'
			}
		],
		studyPhaseOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '基础'
			},
			{
				value: '1',
				label: '强化'
			},
			{
				value: '2',
				label: '冲刺'
			},
			{
				value: '3',
				label: '其他'
			}
		],
		fansTypeOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '学员'
			},
			{
				value: '1',
				label: '家长'
			},
			{
				value: '2',
				label: '普通粉丝'
			}
		],
		userRoleOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '学员'
			},
			{
				value: '1',
				label: '老师'
			},
			{
				value: '2',
				label: '机构雇员'
			}
		],
		agreementStatusOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '正常'
			},
			{
				value: '1',
				label: '有退费',
			},
			{
				value: '2',
				label: '已退费'
			}
		],
		agreementTypeOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '新合同'
			},
			{
				value: '1',
				label: '续费合同',
			}
		],
		refundStatusOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '待审核'
			},
			{
				value: '1',
				label: '审核未通过'
			},
			{
				value: '2',
				label: '审核通过(带退费)'
			},
			{
				value: '3',
				label: '审核通过(已退费)'
			},
			{
				value: '4',
				label: '已关闭'
			}
		],
		payTypeOptions: [
			{
				value: '0',
				label: '现金'
			},
			{
				value: '1',
				label: '转账'
			},
			{
				value: '2',
				label: 'POS机'
			},
			{
				value: '3',
				label: '支票'
			},
			{
				value: '4',
				label: '其他'
			}
		],
		questionTypeOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '单选题'
			},
			{
				value: '1',
				label: '多选题'
			},
			{
				value: '2',
				label: '填空题'
			},
			{
				value: '3',
				label: '问答题'
			}
		],
		questionPhaseOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '基础'
			},
			{
				value: '1',
				label: '强化'
			},
			{
				value: '2',
				label: '冲刺'
			}
		],
		typeOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '线索',
				label: '线索'
			},
			{
				value: '学员',
				label: '学员'
			},
			{
				value: '课程管理',
				label: '课程管理'
			},
			{
				value: '教务',
				label: '教务'
			},
			{
				value: '财务',
				label: '财务'
			},
			{
				value: '系统设置',
				label: '系统设置'
			}
		],
		assignmentStatusOptions: [
			{
				value: '-1',
				label: '请选择'
			},
			{
				value: '0',
				label: '未提交'
			},
			{
				value: '1',
				label: '已提交'
			},
			{
				value: '2',
				label: '已批改'
			}
		]
    }
};
