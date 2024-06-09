<template>
  <ModalBase :onClose="onClose">
    <h2 class="heading">Создать группу</h2>
    <form @submit="onSubmit" class="form">
      <span class="label">{{ t("literals") }}</span>
      <Input
        :error="errors.title"
        v-model="title"
        elevated
        :placeholder="t('literals')"
      />

      <span class="label">{{ t("specialty") }}</span>
      <Multiselect
        v-model="specialization"
        :placeholder="t('specialty')"
        class="elevated"
        :options="generalStore.specializations"
        track-by="id"
        label="title"
        :showLabels="false"
      />
      <ErrorText v-if="errors.specialization" class="error">{{
        errors.specialization
      }}</ErrorText>

      <span class="label">{{ t("curator") }}</span>
      <Multiselect
        v-model="curator"
        :placeholder="t('curator')"
        class="elevated"
        :options="generalStore.teachers"
        track-by="id"
        label="fio"
        :showLabels="false"
      />
      <ErrorText v-if="errors.curator" class="error">{{
        errors.curator
      }}</ErrorText>

      <ColorPicker
        @color-change="
          (value) => {
            color = value;
          }
        "
      />

      <Button
        type="submit"
        center
        elevated
        :label="t('create')"
        :trailing="Plus"
      />
    </form>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from "@/components/ModalBase.vue";
import Input from "../ui/Input.vue";
import Multiselect from "vue-multiselect";
import Button from "@/components/ui/Button.vue";
import Plus from "@/assets/icons/Plus.vue";
import ErrorText from "@/components/ErrorText.vue";
import ColorPicker from "@/components/ColorPicker.vue";
import { useGeneralStore } from "@/stores/general";
import { useGroupStore } from "@/stores/group";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useI18n } from "vue-i18n";

const generalStore = useGeneralStore();
const groupStore = useGroupStore();
const { t } = useI18n();

const validationSchema = yup.object({
  title: yup.string().required("Поле обязательно"),
  curator: yup
    .object<{ id: number; fio: string }>()
    .required("Поле обязательно"),
  specialization: yup
    .object<{ id: number; title: string }>()
    .required("Поле обязательно"),
  color: yup.string().required("Поле обязательно"),
});

const { defineField, handleSubmit, errors, setFieldError } =
  useForm<CreateGroupForm>({
    validationSchema,
  });

const [title] = defineField("title");
const [curator] = defineField("curator");
const [specialization] = defineField("specialization");
const [color] = defineField("color");

const onSubmit = handleSubmit(async (values) => {
  let isNameNotTaken = await groupStore.checkNameAvailability(title.value);

  if (!isNameNotTaken) {
    setFieldError("title", "Группа с таким именем уже существует");
    return;
  }

  groupStore.createGroup(
    values.title,
    values.curator.id,
    values.specialization.id,
    values.color,
  );

  props.onClose();
});

const props = defineProps<{
  onClose: () => void;
}>();

interface CreateGroupForm {
  title: string;
  curator: { id: number; fio: string };
  specialization: { id: number; title: string };
  color: string;
}
</script>

<style lang="scss" scoped>
.heading {
  font-size: var(--fs-600);
}

.error {
  margin-top: -0.75rem;
}

.label {
  display: block;
  font-size: var(--fs-300);
  font-weight: var(--fs-bold);
  color: var(--clr-neutral-300);
  margin-bottom: -0.5rem;

  &.margin {
    margin-bottom: 0.5rem;
  }
}

.form {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;

  button {
    margin-top: 2rem;
  }
}
</style>
