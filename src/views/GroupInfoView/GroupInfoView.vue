<template>
    <ContainerWithHeading :heading="'Группы -> ' + groupName">
        <div class="container">
            <div class="info">
                <InputGroup
                    class="literals-input"
                    id="literals"
                    label="Литеры группы"
                    placeholder="Литеры"
                />
                <DropdownGroup
                    id="branch"
                    label="Отделение"
                    :options="options"
                    :selected="options[1]"
                />
                <DropdownGroup
                    id="curator"
                    label="Куратор"
                    :options="curatorOptions"
                    :selected="curatorOptions[0]"
                />
                <Accordion class="accordion">
                    <SubjectControl
                        @changeSubject="handleChangeSubject"
                        @addSubject="handleAddSubject"
                        @deleteSubject="handleDeleteSubject"
                        :subjects="subjects"
                    />
                </Accordion>
            </div>

            <StudentList :groupName="groupName" />
        </div>
    </ContainerWithHeading>
</template>

<script setup>
import ContainerWithHeading from "@/components/ContainerWithHeading.vue";
import StudentList from "./components/StudentList.vue";
import SubjectControl from "./components/SubjectControl.vue";
import InputGroup from "@/components/ui/InputGroup.vue";
import DropdownGroup from "@/components/ui/DropdownGroup.vue";
import mockGroups from "@/views/mockGroups.json";
import Accordion from "@/components/Accordion.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";

const currentRoute = useRoute();

const groupName = mockGroups.filter(
    (group) => group.id == currentRoute.params.id,
)[0].literals;

const subjects = ref([
    {
        id: "1",
        name: "Верстка Веб-Страниц",
        professor: "Татьяна Григорьевна",
    },
    {
        id: "2",
        name: "Основы Front-End",
        professor: "Денис Валентинович",
    },
    {
        id: "3",
        name: "Программирование",
        professor: "Рушан Багдатович",
    },
]);

const handleAddSubject = () => {
    const newSubject = {
        id: crypto.randomUUID(),
        name: "",
        professor: "",
    };

    subjects.value.push(newSubject);
};

const handleDeleteSubject = (id) => {
    subjects.value = subjects.value.filter((subject) => subject.id !== id);
};

const handleChangeSubject = ({ id, field, value }) => {
    const subject = subjects.value.find((subject) => subject.id === id);

    if (subject) {
        subject[field] = value;
    }
};

const options = [
    {
        name: "все",
        value: "all",
    },
    {
        name: "программирование",
        value: "programming",
    },
    {
        name: "дизайн",
        value: "design",
    },
    {
        name: "туризм",
        value: "tourism",
    },
];

const curatorOptions = [
    {
        name: "Гульнар Нурхамитовна",
        value: "1",
    },
    {
        name: "Денис Валентинович",
        value: "2",
    },
];
</script>

<style lang="scss" scoped>
.info {
    width: 25rem;
    display: grid;
    gap: 1rem;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: start;
}

.accordion {
    margin-top: 1.5rem;
}

.literals-input {
    max-width: 18rem;
}
</style>
