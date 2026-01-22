import EditForm from './_components/edit-form';

import { fetchHabit } from './action';

export default async function Page(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id;

    const habit = await fetchHabit({ habitId: id });

    return (
        <main>
            <EditForm habit={habit}/>
        </main>
    )
}
