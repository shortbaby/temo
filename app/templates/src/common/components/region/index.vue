<!--
    @file 中国地址选择器
    @author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
    <div class="region-picker">
        <label class="province">
            <slot name="province"></slot>
            <select v-model="regionData.province" class="form-control" style="width:96px">
                <option value="">－省份－</option>
                <option v-for="item in provinces" :value="item" v-text="item"></option>
            </select>
        </label>

        <label class="city">
            <slot name="city"></slot>
            <select v-model="regionData.city" class="form-control" style="width:105px">
                <option value="">－城市－</option>
                <option v-for="item in cities" :value="item" v-text="item"></option>
            </select>
        </label>

        <label class="district">
            <slot name="district"></slot>
            <select v-model="regionData.district" class="form-control" style="width:105px">
                <option value="">－区县－</option>
                <option v-for="item in districts" :value="item" v-text="item"></option>
            </select>
        </label>
    </div>
</template>

<script>

import {getArea} from '../../request';

function convertToArray (obj) {
    var result = [];
    for (var key in obj) {
        if ( key !== 'id') {
            result.push(key);
        }
    }
    return result;
}

export default {
    data () {
        return  {
            cityData: window.area || null
        }
    },
    props: {
        regionData: {
            twoWay: true,
            default () {
                return  {
                    province: '',
                    city: '',
                    district: '',
                    areaId: '',
                    areaLevel: ''
                };
            }
        },
        provinces: {
            default () {
                return [];
            }
        },
        cities: {
            default () {
                return [];
            }
        },
        districts: {
            default () {
                return [];
            }
        }
    },
    ready () {
        if (this.cityData) {
            this.$set('provinces', convertToArray(this.cityData));
        } else {
            getArea ()
                .then( (res) => {
                    this.cityData = window.area = res;
                    this.$set('provinces', convertToArray(res));
                });
        }
    },
    methods: {
        changeProvince(newValue, oldValue) {
            if (newValue) {
                var cities = convertToArray(this.cityData[newValue]);
                var city = cities.length == 1 ? cities[0] : '';
                this.$set('cities', cities);
                if (city) {
                    this.$set('regionData.city', city);
                }
                this.$set('regionData.areaId', this.cityData[newValue]['id']);
                this.$set('regionData.areaLevel', 'province');
                this.$set('districts', []);
                this.$set('regionData.district', '');

            } else {
                this.$set('cities', []);
                this.$set('districts', []);
            }
        },
        changeCity (newValue, oldValue) {
            if (newValue) {
                var self = this;
                setTimeout(function () {
                    self.$set('districts', convertToArray(self.cityData[self.regionData.province][newValue]));
                    self.$set('regionData.areaId', self.cityData[self.regionData.province][newValue]['id']);
                    self.$set('regionData.areaLevel', 'city');
                    self.$set('regionData.city', newValue);
                });
            }
        },
        changeDistrict (newValue, oldValue) {
            var self = this;
            if (newValue) {
                setTimeout(function () {
                    self.$set('regionData.areaId', self.cityData[self.regionData.province][self.regionData.city][newValue]['id']);
                    self.$set('regionData.district', newValue);
                });
            }
        }
    },
    watch: {
        'regionData.province': {
            handler (newValue, oldValue) {
                this.changeProvince(newValue, oldValue);
            },
            deep: true
        },
        'regionData.city': {
            handler (newValue, oldValue) {
                this.changeCity(newValue, oldValue);
            },
            deep: true
        },
        'regionData.district': {
            handler (newValue, oldValue) {
               this.changeDistrict(newValue, oldValue);
            },
            deep: true
        }
    }
}
</script>