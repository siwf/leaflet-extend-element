/*
 * @Author: siwenfeng
 * @Date: 2020-07-06 17:41:56
 * @LastEditTime: 2021-03-10 13:46:42
 * @Description: this is ....
 */
const top = [
    {
        id: 1,
        type: "dbs",
        name: '地表水1',
        latitude: "25.635983",
        longitude: "117.489107",
        alarm: false, // 是否超标
        waterGrade: 0
    },
    {
        id: 2,
        type: "dbs",
        name: '地表水1',
        alarm: true, // 是否超标
        latitude: "25.735983",
        longitude: "117.689107",
        waterGrade: 2
    },
    {
        id: 3,
        type: "szdz",
        name: '水自动站',
        alarm: false, // 是否超标
        latitude: "25.835983",
        longitude: "117.489107",
        waterGrade: 3
    },
    {
        id: 4,
        type: "yys",
        name: '饮用水',
        alarm: false, // 是否超标
        latitude: "24.735983",
        longitude: "117.489107",
        waterGrade: 4
    },
    {
        id: 5,
        type: "wry",
        name: '污染源',
        alarm: false, // 是否超标
        latitude: "24.935983",
        longitude: "117.489107",
        waterGrade: 7
    },
    {
        id: 15,
        type: "wry",
        name: '污染源',
        alarm: false, // 是否超标
        latitude: "24.935984",
        longitude: "117.489107",
        waterGrade: 0
    },
    {
        id: 5,
        type: "wry",
        name: '污染源',
        alarm: false, // 是否超标
        latitude: "24.935983",
        longitude: "117.489107",
        waterGrade: 3
    },
    {
        id: 6,
        type: "ncwsz",
        name: '农村污水站',
        alarm: false, // 是否超标
        latitude: "25.759830",
        longitude: "117.489107",
        waterGrade: 2
    },
    {
        id: 7,
        type: "rhpwk",
        name: '入河排污口',
        alarm: false, // 是否超标
        latitude: "25.735983",
        longitude: "117.589107",
        waterGrade: 5
    },
    {
        id: 8,
        type: "sdz",
        name: '水电站',
        alarm: false, // 是否超标
        latitude: "25.735983",
        longitude: "117.689107",
        waterGrade: 4
    },
    {
        id: 9,
        type: "swz",
        name: '水文站',
        alarm: false, // 是否超标
        latitude: "25.736983",
        longitude: "117.489107",
        waterGrade: 1
    },
    {
        id: 10,
        type: "qxz",
        name: '气象站',
        alarm: false, // 是否超标
        latitude: "25.735993",
        longitude: "117.489107",
        waterGrade: 2
    },
    {
        id: 11,
        type: "qxz",
        name: '气象站',
        alarm: true, // 是否超标
        latitude: "25.735963",
        longitude: "117.489107",
        waterGrade: 3
    },
    {
        id: 12,
        type: "wry",
        name: '污染源1',
        alarm: false, // 是否超标
        latitude: "26.735983",
        longitude: "117.489107",
        waterGrade: 3
    },
    {
        id: 13,
        type: "qxz",
        name: '气象站1',
        alarm: true, // 是否超标
        latitude: "25.735983",
        longitude: "117.499107",
        waterGrade: 4
    },
    {
        id: 14,
        type: "swz",
        name: '水文站1',
        alarm: false, // 是否超标
        latitude: "25.736983",
        longitude: "117.489107",
        waterGrade: 5
    },
    {
        id: 15,
        type: "dbs",
        name: '地表水2',
        alarm: false, // 是否超标
        latitude: "27.735983",
        longitude: "117.489107",
        waterGrade: 2
    },
    {
        id: 16,
        type: "ncpwk",
        name: '农村排污口1',
        alarm: false, // 是否超标
        latitude: "25.735983",
        longitude: "118.489107",
        waterGrade: 6
    },

  ]
  
  module.exports = [
  
    // user logout
    {
      url: '/water/getAllpoint',
      type: 'get',
      response: _ => {
        return {
          code: 20000,
          data: top
        }
      }
    }
  ]
  