<template>
  <div><slot></slot></div>
</template>

<script>
  let columnIdSeed = 1;

  export default {
    props: {
      type: {},
      label: {},
      property: {},
      width: {},
      minWidth: {},
      sortable: {
        type: Number,
        default: 0
      },
      resizable: {
        type: Boolean,
        default: true
      },
      formatter: {
        type: Function
      },
      clazz: '',
      field: {}
    },

    data() {
      return {
        template: null,
        isChildColumn: false,
        columns: []
      };
    },

    created() {

      this.columnId = (this.$parent.gridId || (this.$parent.columnId + '_')) + 'column_' + columnIdSeed++;

      let parent = this.$parent;
      let grid = parent;

      if (!parent.gridId) {
        this.isChildColumn = true;
        let current = parent;
        while (current) {
          if (current.gridId) {
            grid = current;
            break;
          }
          current = current.$parent;
        }
      }

      let property = this.property;
      let sortable = !!this.sortable;

      // if (this.sortable === undefined) {
      //   this.sortable = !!property;
      // }

      let label = this.label;
      let schema = (grid || parent).gridSchema;

      if (property && schema && !label) {
        this.label = label = schema.getPropertyLabel(property);
      }

      let width = this.width;
      if (width !== undefined) {
        width = parseInt(width, 10);
        if (isNaN(width)) {
          width = null;
        }
      }

      let minWidth = this.minWidth;
      if (minWidth !== undefined) {
        minWidth = parseInt(minWidth, 10);
        if (isNaN(minWidth)) {
          minWidth = 100;
        }
      } else {
        minWidth = 100;
      }

      let columnId = this.columnId;
      let type = this.type;

      this.columnConfig = {
        id: columnId,
        label: label,
        property: property,
        minWidth: minWidth,
        width: width,
        realWidth: width || minWidth,
        direction: '',
        sortable: this.sortable,
        resizable: this.resizable,
        type: type,
        formatter: this.formatter,
        field: this.field,
        clazz: this.class
      };
    },

    beforeCompile() {
      let options = this.$options;

      let tagName = this.$options.el.tagName.toLowerCase();
      let isColumnGroup = false;

      if (options._content) {
        let content = options._content.innerHTML;
        if (content.indexOf(`</${tagName}>`) === -1) {
          options._content = null;
          this.template = content;
        } else {
          this.template = null;
          isColumnGroup = true;
        }
      }

      let width = this.width;
      let type = this.type;
      let property = this.property;
      let columnId = this.columnId;
      let template = this.template;
      let field = this.field;

      let headerTemplate;
      let columnConfig = this.columnConfig;

      if (type === 'selection') {
        headerTemplate = '<input type="checkbox" @click="$parent.toggleAllSelection($event)" v-model="$parent.allSelected" />';
        template = '<input type="checkbox" @change="$parent.$parent.toggleSelection($event, row)" v-model="row.$selected"/>';
        if (!width) {
          columnConfig.minWidth = columnConfig.width = columnConfig.realWidth = 30;
          columnConfig.resizable = false;
        }
      } else if (type === 'index') {
        headerTemplate = '';
        template = '{{ $index + 1 }}';
        if (!width) {
          columnConfig.minWidth = columnConfig.width = columnConfig.realWidth = 30;
          columnConfig.resizable = false;
        }
      } else if (property == 'nextRemindTime') {
          template = `<span>{{ row['${property}']|date'yyyy-MM-dd hh:mm'}}</span>`;
      } else if (property == 'createTime') {
        template = `<span>{{ row['${property}']|date'yyyy-MM-dd hh:mm'}}</span>`;
      } else if (property == 'lastFollowTime') {
          template = `<span>{{ row['${property}']|date'yyyy-MM-dd hh:mm'}}</span>`;
      } else if (type == 'DATE') {
        template = `<span>{{ row['${property}']|date'yyyy-MM-dd'}}</span>`;
      } else if (type == 'MONEY') {
        template = `<span>{{ row['${property}']| money 100}}</span>`;
      } else if (property == 'intensionLevel') {
          template = `<rater :font-size="14" :value.sync="row['${property}']" :disabled="true" star="★" active-color="#FF9900" :margin="4"></rater>`;
      } else if (property == 'coverUrl') {
        template = `<img :src="row['${property}']|compressImage 80 52" width="80" height="52" style="margin-top:5px;">`;
      } else if (type && type.toLowerCase() == 'currency') {
            template = `{{ $getPropertyText(row, '${property}', '${columnId}') / 100 | currency '¥ '}}`;
      } else {
        if ((!template || /^\s*$/.test(template)) && property) {
          template = `{{ $getPropertyText(row, '${property}', '${columnId}') }}`;
        }
      }

      columnConfig.template = template;
      if (headerTemplate !== undefined) {
        columnConfig.headerTemplate = headerTemplate;
      }
      columnConfig.isColumnGroup = isColumnGroup;
    },

    detached() {
      let columns = this.$parent && this.$parent.columns;
      if (columns) {
        let columnId = this.columnId;
        for (let i = 0, j = columns.length; i < j; i++) {
          let column = columns[i];

          if (column.id === columnId) {
            columns.splice(i, 1);
            break;
          }
        }
      }

      if (this.isChildColumn) {
        if (this.$parent && this.$parent.$parent.$ready) {
          this.$parent.$parent.debouncedReRender();
        }
      } else {
        if (this.$parent && this.$parent.$ready) {
          this.$parent.debouncedReRender();
        }
      }
    },

    watch: {
      label(newVal) {
        if (this.columnConfig) {
          this.columnConfig.label = newVal;
        }
      }
    },

    ready() {

      let parent = this.$parent;
      let columnConfig = this.columnConfig;
      let columnIndex;

      if (!this.isChildColumn) {
        columnIndex = [].indexOf.call(parent.$els.hiddenColumns.children, this.$el);
      } else {
        columnIndex = [].indexOf.call(parent.$el.children, this.$el);
      }

      parent.columns.splice(columnIndex, 0, columnConfig);

      if (this.isChildColumn) {
        parent.columnConfig.columns = parent.columns;

        if (parent.$parent.$ready) {
          parent.$parent.debouncedReRender();
        }
      } else {
        if (parent.$ready) {
          parent.debouncedReRender();
        }
      }
    }
  };
</script>