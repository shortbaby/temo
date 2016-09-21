<!--
    @file 分页器
    @author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
    <div v-show="totalPages > 1" class="pager-wrapper">
        <ul class="pagination">
            <li v-if="!noPrevious">
                <a  v-on:click="selectPage(pageNo - 1)" aria-label="Previous">
                    <span aria-hidden="true"><span class="icon-left"></span>上一页</span>
                </a>
            </li>
            <li v-for="page in pages" v-bind:class="{ 'active': page.number == pageNo, 'disabled': page.disabled }">
                <a  v-on:click="selectPage(page.number)" v-text="page.text"></a>
            </li>
            <li v-if="!noNext">
                <a  v-on:click="selectPage(pageNo + 1)" aria-label="Next">
                    <span aria-hidden="true"><span class="icon-right"></span>下一页</span>
                </a>
            </li>
            <li>共{{ totalPages }}页&nbsp;&nbsp;去第<input v-model="goPageNum" class="go-page-num">页<span class="btn-go" @click="goPage">确定</span></li>
        </ul>
    </div>
</template>
<script>
    module.exports = {
        data () {
            return {
                goPageNum: ''
            };
        },
        props: {
            pageNo: {
                twoWay: true,
                type: Number,
                validator: function (value) {
                    return value > 0
                },
                default: 1
            },
            pageSize: {
                twoWay: true,
                type: Number,
                validator: function (value) {
                    return value > 0
                },
                default: 20
            },
            count: {
                type: Number,
                default: 0
            },
            displayNum: {
                type: Number,
                default: 6
            },
            edgeNum: {
                type: Number,
                default: 2
            }
        },
        replace: true,
        inherit: false,
        computed: {
            noPrevious: function () {
                return this.pageNo === 1;
            },
            noNext: function () {
                return this.pageNo === this.totalPages;
            },
            pages: function () {
                return getPages(this.pageNo, this.totalPages, this.edgeNum, this.displayNum);
            },
            totalPages: function () {
                return getTotalPages(this.pageSize, this.count);
            },
            startIndex: function () {
                return Math.min(this.count, (this.pageNo - 1) * this.pageSize + 1);
            },
            endIndex: function () {
                return Math.min(this.count, this.pageNo * this.pageSize);
            }
        },
        methods: {
            selectPage: function (num) {
                if (this.pageNo != num && num > 0 && num <= this.totalPages) {
                    this.pageNo = num;
                    this.$dispatch('page-change', this.pageNo);
                }
            },
            goPage: function () {
                var goPageNum = this.goPageNum;

                if (goPageNum > 0 && goPageNum <= this.totalPages) {
                    this.pageNo = +goPageNum;
                    this.$dispatch('page-change', this.pageNo);
                }
            },
            selectSize: function (size) {
                if (this.pageSize != size && size > 0) {
                    this.pageSize = size;
                    if (this.pageNo > this.totalPages) {
                        this.selectPage(this.totalPages);
                    } else {
                        this.$dispatch('page-change');
                    }
                }
            },
        },
    };

    function getTotalPages(pageSize, count) {
        var totalPages = pageSize < 1 ? 1 : Math.ceil(count / pageSize);
        return Math.max(totalPages || 0, 1);
    }

    // Create page object used in template
    function makePage(number, text, isActive) {
        return {
            number: number,
            text: text,
            disabled: number === -1,
        };
    }

    /**
    * Calculate start and end point of pagination links depending on
    * currentPage and num_display_entries.
    * @return {Array}
    */
    function getInterval(currentPage, pageCount, num_display_entries) {
        //var num_display_entries = 6;
        var ne_half = Math.ceil(num_display_entries / 2);
        var np = pageCount;
        var upper_limit = np - num_display_entries;
        var start = currentPage > ne_half ? Math.max(Math.min(currentPage - ne_half, upper_limit), 0) : 0;
        var end = currentPage > ne_half ? Math.min(currentPage + ne_half, np) : Math.min(num_display_entries, np);
        return [start, end];
    }

    function getPages(currentPage, totalPages, num_edge_entries, num_display_entries) {
        var ret = [];
        //var num_edge_entries = 2;
        var skip_text = '...';
        var np = totalPages;
        var interval = getInterval(currentPage - 1, totalPages, num_display_entries);

        // Generate starting points
        if (interval[0] > 0 && num_edge_entries > 0) {
            var end = Math.min(num_edge_entries, interval[0]);
            for (var i = 0; i < end; i++) {
                var page = makePage(i + 1, i + 1);
                ret.push(page);
            }
            if (num_edge_entries < interval[0]) {
                var page = makePage(-1, skip_text);
                ret.push(page);
            }
        }
        // Generate interval links
        for (var i = interval[0]; i < interval[1]; i++) {
            var page = makePage(i + 1, i + 1);
            ret.push(page);
        }
        // Generate ending points
        if (interval[1] < np && num_edge_entries > 0) {
            if (np - num_edge_entries > interval[1]) {
                var page = makePage(-1, skip_text);
                ret.push(page);
            }
            var begin = Math.max(np - num_edge_entries, interval[1]);
            for (var i = begin; i < np; i++) {
                var page = makePage(i + 1, i + 1);
                ret.push(page);
            }
        }

        return ret;
    }

</script>

<style lang="sass">
    .pager-wrapper {
        text-align: center;
        margin: 0 auto;
        padding: 18px 0;
    }

    .pagination>li {
        display: inline-block;
        list-style: none;
    }

    .pagination>li>a{
        color: #666;
        padding: 6px 10px;
        border: 1px solid #DDD;
        background: #fff;
        border-radius: 4px;
        margin-right: 10px;
        cursor: pointer;
    }

    .pagination>li>a:hover{
        border-radius: 4px;
        border-color: #DDD;
        background: #f2f2f2;
        border-radius: 4px;
        text-decoration: none;
    }

    .pagination>.active>a {
        color: #99d4ff;
        border: 1px solid #b5e0ff;
        background: #effaff;
    }
    .pagination>.active>a:focus,
    .pagination>.active>a:hover {
        color: #99d4ff;
        border-radius: 4px;
        border-color: #b5e0ff;
        background: #d8eef8;
        text-decoration: none;
        border-radius: 4px;
    }

    .pagination>.disabled>a {
        cursor: default;
    }
    .pagination>.disabled>a:focus,
    .pagination>.disabled>a:hover {
        color: #666;
        border: 1px solid #DDD;
        background: #fff;
        text-decoration: none;
    }

    .btn-go {
        display: inline-block;
        background-color: #fff;
        border: 1px solid #DDD;
        color: #555;
        cursor: pointer;
        border-radius: 2px;
        padding: 2px 8px;
        margin: 0 8px;
        &:hover {
            background: #fcfcfc;
        }
    }
    .go-page-num {
        width: 20px;
        margin: 0 4px;
        height: 22px;
        line-height: 22px;
        padding: 0 8px;
        border: 1px solid #DDD;
        border-radius: 2px;
    }

    .pagination {
        .total-info {
            display: inline-block;
            line-height: 39px;
            position: relative; 
            top: -8px;
            color: #999;
            margin-right: 10px;
            > span {
                color: #FFF;
                margin: 0 3px;
            }
        }
    }
</style> 