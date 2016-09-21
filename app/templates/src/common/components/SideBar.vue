<!--
    @file libra 左导
    @author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
	<div class="nav-menu">
		<div class="left-sidebar">
			<div class="nav-list">
				<ul v-for="item in tabs">
					<li @click="getSubMenu(item)" :class="{active: item.alias == current}">
						<span class="icon icon-{{item.alias}}"></span>{{ item.text }}
					</li>
					<ul v-show="item.alias == current">
						<li v-for="child in item.menus" :class="{active: currentSubTab.indexOf(child.url) > -1 }" @click="forward(child)">
							<a href="javascript:;">{{ child.text }}</a>
						</li>
					</ul>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				config: {},
				showSubMenu: false,
				currentSubTab: window.location.hash.slice(3) || '',
				children: [],
				current: '',
				tabs: []
			}
		},
		created () {
			let sideBarList= [
				{
					"text": "首页",
		        	"alias": "home",
		        	"url" :"/home",
		        	"menus": []
				}
			];
			$.extend(this.config, {
				current: 'home',
				defaultSubActive: '',
				tabs: sideBarList
			})
			let currentSubTab = this.currentSubTab;
			sideBarList.some((item) => {
				let current = '';
				item.menus.some((child) => {
					if (child.url == currentSubTab) {
						this.current = item.alias;
						return;
					}
				});
				return;
			});
			this.tabs = sideBarList;
			
		},

		ready: function () {
			//var self = this;
			//this.setStatus();
		},
		methods: {
			getSubMenu (item) {
				this.current = item.alias;
				if (item.menus.length == 0) {
					this.forward(item);
				}
			},
			forward (item) {
				//debugger;
				var url = item.url;
				if (url) {
					//dispatch('SET_CURRENT_PATH_TEXT', item.text);
					this.currentSubTab = url;
					//dispatch('SET_CURRENT_SUB_TAP', url);
					window.router.go(url);
				}
			}
		}
	}
</script>

<style lang="sass">
	.nav-menu {
		height: 100%;
		overflow: hidden;
		float:left;
	}
	.left-sidebar {
		position: fixed;
		margin-top: 50px;
		top: 0;
		left: 0;
		z-index: 11;
		float: left;
	  	background: #364150;
	  	width: 192px;
	  	height: 100%;
	  	overflow: hidden;
	  	overflow-y: auto;
	  	.nav-list {
	  		color: #FFF;
	  		min-height: 940px;
		  	> ul {
				> li {
					padding-left: 38px;
			  		vertical-align: middle;
			  		cursor: pointer;
			  		list-style: none;
					height: 44px;
					line-height: 44px;
					font-size: 16px;
			  		> .icon {
						font-size: 20px;
						margin-right: 18px;
						position: relative;
						top: 1px;
						&.icon-finance {
							font-size: 19px;
						}
			  		}
			  		&.active {
			  			position: relative;
			  			background: #1c9cdd;
			  			&:after {
			  				content: '';
			  				border: 8px solid transparent;
			  				position: absolute;
			  				right: 0;
			  				top: 50%;
			  				-webkit-transform: translate(0, -50%);
			  				-ms-transform: translate(-50%, -50%);
	         				 -o-transform: translate(-50%, -50%);
				            	transform: translate(0, -50%);
			  				width: 0;
			  				height: 0;
			  				border-right-color: #FFF;
		  				}
			  		}
			  		&:not(.active) {
				  		&:hover {
					  		background: #515d6c;
				  		}
			  		}
			  	}
			  	> ul {
			  		position: relative;
			  		> li {
			  			list-style: none;
			  			// border-left: 2px solid #7a8fac;
			  			transition: all .2s ease;
			  			padding-left: 73px;
			  			height: 44px;
			  			line-height: 44px;
			  			&.active {
			  				background: #515d6c;
			  			}
			  			&:hover {
			  				background: #515d6c;
			  			}
						a {
							color: #FFF;
							&:hover {
								text-decoration: none;
							}
						}
					}
			  	}
		  	}
		}
	}
	.sub-item-transition {
		transition: all .1s ease;
	}
	.sub-item-enter, .sub-item-leave {
		opacity: 0;
	}
</style>