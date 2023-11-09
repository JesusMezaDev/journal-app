import type { RouteRecordRaw } from 'vue-router';

const DaybookRouter: RouteRecordRaw = {
    path: '/daybook',
    name: 'daybook',
    component: () => import('@/modules/daybook/layouts/DayBookLayout.vue'),
    children: [
        {
            path: '',
            name: 'no-entry',
            component: () => import('@/modules/daybook/views/NoEntrySelected.vue')
        },
        {
            path: ':id',
            name: 'entry',
            props: true,
            component: () => import('@/modules/daybook/views/EntryView.vue')
        }
    ]
}

export default DaybookRouter;