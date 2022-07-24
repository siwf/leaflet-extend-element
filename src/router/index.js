import Vue from 'vue'
import Router from 'vue-router'

// bug
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

/* Layout */
// import Layout from '@/layout'

export const constantRoutes = [
  // 水质分析 水质评价 综合达标率
  {
    path: '/',
    component: () => import('@/views/waterAnalysis/waterEvaluate/zhdbl')
  },
  // 水质分析 水质评价 断面水质评价
  {
    path: '/waterEvaluate',
    component: () => import('@/views/waterAnalysis/waterEvaluate/sectionEvaluate')
  },
  // 水质分析 水质评价 河流湖库水质评价
  {
    path: '/riverLakeEvaluate',
    component: () => import('@/views/waterAnalysis/waterEvaluate/riverLakeEvaluate')
  },
  // 湖库营养化指数
  {
    path: '/riverLakerExponential',
    component: () => import('@/views/waterAnalysis/waterEvaluate/riverLakerExponential')
  },
  // 水质分析 水质评价 饮用水源评价
  {
    path: '/drinkWater',
    component: () => import('@/views/waterAnalysis/waterEvaluate/drinkWater')
  },
  // 水质分析 趋势分析 连续时间段分析
  {
    path: '/periodTime',
    component: () => import('@/views/waterAnalysis/trendAnalysis/periodTime')
  },
  // 水质分析 趋势分析 历年同期分析
  {
    path: '/yearAnalysis',
    component: () => import('@/views/waterAnalysis/trendAnalysis/yearAnalysis')
  },
   // 水质分析 趋势分析 沿程分析
  {
    path: '/alongRiver',
    component: () => import('@/views/waterAnalysis/trendAnalysis/alongRiver')
  },
  //  水质分析 趋势分析 秩相关系数
  {
     path: '/rankCoefficient',
     component: () => import('@/views/waterAnalysis/trendAnalysis/rankCoefficient')
  },
  //  水质分析  趋势分析  同环比分析
  {
      path: '/yearMonthErlier',
      component: () => import('@/views/waterAnalysis/trendAnalysis/yearMonthErlier')
  },
  // 水质分析 水质指数CWQI 城市CWQI
  {
    path: '/cityCWQI',
    component: () => import('@/views/waterAnalysis/cwqi/cityCwqi')
  },
  // 水质分析 水质指数CWQI 断面CWQI
  {
    path: '/sectionCWQI',
    component: () => import('@/views/waterAnalysis/cwqi/sectionCwqi')
  },
  // 水质分析 水质指数CWQI 断面CWQI同环比分析
  {
    path: '/sectionCicleDiff',
    component: () => import('@/views/waterAnalysis/cwqi/cicleDiff')
  },
  // 水质分析 水质指数CWQI 各指标对cwqi的贡献率
  {
    path: '/contributedCWQI',
    component: () => import('@/views/waterAnalysis/cwqi/contributed')
  },
  // 水质分析 水质监测数据 监测数据管理
  {
    path: '/monitorData',
    component: () => import('@/views/waterAnalysis/monitorData/mange')
  },
  // 水质分析 水质监测数据 达标差距及统计
  {
    path: '/stard',
    component: () => import('@/views/waterAnalysis/monitorData/stard')
  },
  // 水质预报预警 水质预报（GIS）
  {
    path: '/waterForecast',
    component: () => import('@/views/waterForecast/')
  },
  // 水质预报预警 预报历史
  {
    path: '/forecastHistory',
    component: () => import('@/views/waterForecast/forecastHistory')
  },
  // 水质预报预警 预报与实测值比较
  {
    path: '/forecastDiff',
    component: () => import('@/views/waterForecast/forecastDiff')
  },
  // 当前水质 一张图
  {
    path: '/currentWater',
    component: () => import('@/views/currentWater')
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  } // 动态路由不应该加在这里
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
