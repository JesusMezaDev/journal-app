import { useRoute, type RouteRecordRaw } from 'vue-router';

import { isAuthenticatedGuard } from '@/modules/auth/guards/auth';

const DaybookRouter: RouteRecordRaw = {
    path: '/daybook',
    name: 'daybook',
    component: () => import('@/modules/daybook/layouts/DayBookLayout.vue'),
    beforeEnter: [isAuthenticatedGuard],
    children: [
        {
            path: '',
            name: 'no-entry',
            component: () => import('@/modules/daybook/views/NoEntrySelected.vue')
        },
        {
            path: ':id',
            name: 'entry',
            props: () => ({ id: useRoute().params.id }),
            component: () => import('@/modules/daybook/views/EntryView.vue')
        }
    ]
}

export default DaybookRouter;