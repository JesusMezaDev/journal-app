import { describe, expect, it } from 'vitest';

import daybookRouter from '../../../../src/modules/daybook/router';

describe('Test on Daybook Router', ()=> {
    it('Router configuration', async () => {
        expect(daybookRouter).toMatchObject({
            path: '/daybook',
            name: 'daybook',
            component: expect.any(Function),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any(Function)
                },
                {
                    path: ':id',
                    name: 'entry',
                    props: expect.any(Function),
                    component: expect.any(Function)
                }
            ]
        });
    });
});