<!--
	@file 天校ERP-设置表头
	@author XiaoBin Li (lixiaobin@baijiahulian.com)
-->

<template>
	<div>
		<modal :show.sync="true" :width="737">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title">设置</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hide()"></span>
		  	</div>

		  	<div slot="modal-body" class="modal-body set-header-dialog">
				<div class="clearfix">
					<div class="hide-fields fields-list">
						<h3>隐藏字段</h3>
						<ul>
							<li v-for="item in hiddenFields" @click="select($event, item)" :class="{active: item.$selected, lock: item.lock}" transition="item">{{ item.showName }}</li>
							<p v-if="!hiddenFields.length">没有隐藏字段</p>
						</ul>
					</div>
					<div class="opt-move">
						<span class="icon-left" :class="{light: hasShowFieldsSelected}" title="移动到隐藏字段" @click="moveToHide"></span>
						<span class="icon-right" :class="{light: hasHiddenFieldsSelected}" title="移动到显示字段" @click="moveToShow"></span>
					</div>
					<div class="show-fields fields-list">
						<h3>显示字段</h3>
						<ul>
							<li v-for="item in showFields" @click="select($event, item)" :class="{active: item.$selected, lock: item.lock}" transition="item">{{ item.showName }}</li>
							<p v-if="!showFields.length">没有显示字段</p>
						</ul>
					</div>
					<div class="opt-sort">
						<span :class="{light: canMoveUp}" @click="moveUp" title="向上移动"><span class="icon-up"></span></span>
						<span :class="{light: canMoveDown}" @click="moveDown" title="向下移动"><span class="icon-down"></span></span>
					</div>
				</div>			
			</div>

			<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<button @click.stop="save($event)" class="btn btn-primary">保存</button>
		  			<button @click.stop="hide()" class="btn btn-default">取消</button>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import Modal from '../../../dep/vue-strap/src/Modal.vue';
	import { getHeaderConfig, setHeaderConfig}  from '../request';

	export default {
		props: {
			type: Number,
			default: 0
		},
		data () {
			return {
				fields: [],
			}
		},
		computed: {
			canMoveUp () {
				var result = false;
				var index = -1;
				var showFields = this.showFields;
				var length = showFields.length;

				while (length --) {
					if (showFields[length].$selected) {
						index = length;
						break;
					}
				}

				if (index == -1 || !index) {
					return false;
				}

				for (var i = index -1; i >= 0; i--) {
					var item = showFields[i];
					if (!item.hidden && !item.lock) {
						result = true;
						break;
					}
				}
				return result;
			},
			canMoveDown () {
				
				var result = false;
				var index = -1;
				var showFields = this.showFields;
				var length = showFields.length;

				while (length --) {
					if (showFields[length].$selected) {
						index = length;
						break;
					}
				}
				
				return index >= 0 && index < showFields.length -1;
			},
			hiddenFields () {
				var result = [];
				this.fields.forEach(function (item) {
					if (!item.$using && !item.hidden) {
						result.push(item);
					}
				});
				return result;
			},
			hasHiddenFieldsSelected () {
				return this.hiddenFields.some(function (item) {
					return item.$selected;
				});
			},
			hasShowFieldsSelected () {
				return this.showFields.some(function (item) {
					return item.$selected;
				});
			},
			showFields () {
				var result = [];

				this.fields.forEach(function (item) {
					if (item.$using && !item.hidden) {
						result.push(item);
					}
				});
				return result;
			}
		},
		methods: {
			select (event, item) {
				// 锁定的不能操作
				if (item.lock) {
					return;
				}
				this.fields.forEach(function (item) {
					Vue.set(item, '$selected', false);
				});
				Vue.set(item, '$selected', true);
			},
			moveToShow () {
				if (!this.hasHiddenFieldsSelected) {
					return;
				}
				this.hiddenFields.forEach(function (item) {
					if (item.$selected) {
						Vue.set(item, '$selected', false);
						Vue.set(item, '$using', true);
					}	
				});
			},
			moveToHide () {
				if (!this.hasShowFieldsSelected) {
					return;
				}

				this.showFields.forEach(function (item) {
					if (item.$selected) {
						Vue.set(item, '$selected', false);
						Vue.set(item, '$using', false);
					}	
				});
			},
			moveUp () {
				if (!this.canMoveUp) {
					return;
				}
				var index = -1;
				var selectedItem = null;
				var fields = this.fields;
				var preIndex = -1;
				var length = fields.length;

				while (length --) {
					if (fields[length].$selected) {
						index = length;
						selectedItem = fields[length];
						break;
					}
				}

				// 找上一个显示的字段
				for (var i = index - 1; i >= 0; i--) {
					if (fields[i].$using) {
						preIndex = i;
						break;
					}
				}
				fields[index] = fields.splice(preIndex, 1, selectedItem)[0];
			},

			moveDown () {
				if (!this.canMoveDown) {
					return;
				}
				var index = -1;
				var selectedItem = null;
				var fields = this.fields;
				var nextIndex = -1;
				var length = fields.length;

				while (length --) {
					if (fields[length].$selected) {
						index = length;
						selectedItem = fields[length];
						break;
					}
				}

				length = fields.length;

				// 找下一个显示的字段
				for (var i = index + 1; i < length; i++) {
					if (fields[i].$using) {
						nextIndex = i;
						break;
					}
				}

				fields[index] = fields.splice(nextIndex, 1, selectedItem)[0];
			},
			save (event) {
				var btn = $(event.target);
				btn.prop('disabled', true);
				var self = this;
				var content = [];

				this.fields.forEach(function (item) {
					if (item.$using) {
						content.push({
							name: item.name,
							showName: item.showName,
							type: item.type,
							lock: item.lock,
							hidden: item.hidden,
							defaultProp: item.defaultProp,
							queryProp: item.queryProp,
							sort: item.sort
						});
					}
				});

				setHeaderConfig({
					type: this.type,
					fields: JSON.stringify(content)
				})
					.then(function (res) {
						self.$dispatch('setheadersuceess');
						dispatch('HIDE_SET_HEADER');
						dispatch('TOAST', '保存成功', 'success');
					})
					.always(function () {
						btn.prop('disabled', false);
					});
			}
		},
		components: {
			Modal: Modal
		},
		created () {
			var self = this;
			getHeaderConfig({
				type: this.type
			})
				.then(function (res) {

					var data = res.data;
					var using = data.using;
					var all = data.all;
					var hiding = [];

					all.forEach(function (item) {
						if (!using.some(function (i) { return i.name == item.name; })) {
							item.$using = false;
							hiding.push(item);
						}
					});

					var fields = using.concat(hiding);

					fields.forEach(function (item) {
						item.$selected = false;
						if (typeof item.$using == 'undefined') {
							item.$using = true;
						}
					});
					self.fields = fields;
				});
		},
		vuex: {
			actions: {
				hide: ({ dispatch }) => {
					dispatch('HIDE_SET_HEADER');
				}
			}
		}
	};
</script>