import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

export default function UpdateOrder({order}) {
    const fetcher = useFetcher();

    return <fetcher.Form method='Patch'>
        <Button type="primary">Make it a priority</Button>
    </fetcher.Form>
}

export async function action({request, params}) {
    // console.log("UpdateOrder action called");
    const data = {priority: true};
    await updateOrder(params.orderId, data);
    return null;
}