import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { ref, type Ref } from "vue";
import type {
  FormattedSubstitutionRequests,
  SubstitutionRequest,
} from "@/types";
import { computed } from "vue";
import type { ComputedRef } from "vue";

export const useSubstitutionStore = defineStore("substitution", () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const authStore = useAuthStore();
  const headers = { Authorization: `Bearer ${authStore.token}` };

  const requestsList: Ref<SubstitutionRequest[]> = ref([]);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  const formattedList: ComputedRef<FormattedSubstitutionRequests> = computed(
    () => {
      if (!requestsList.value) return [];
      return formatList(requestsList.value);
    },
  );
  const highlights: ComputedRef<Date[]> = computed(() => {
    if (!requestsList.value) return [];
    return getUniqueDates(requestsList.value);
  });

  const formatList = (list: SubstitutionRequest[]) => {
    const result: FormattedSubstitutionRequests = {};

    list.forEach((substitution) => {
      const {
        date,
        group: { title },
      } = substitution;
      const trimmedDate = date.split(" ")[0];

      if (!result[trimmedDate]) {
        result[trimmedDate] = {};
      }

      if (!result[trimmedDate][title]) {
        result[trimmedDate][title] = [];
      }

      result[trimmedDate][title].push(substitution);
    });

    return result;
  };

  const getUniqueDates = (list: SubstitutionRequest[]) => {
    const datesSet = new Set(list.map((sub) => sub.date));
    const datesArray = Array.from(datesSet).map((dateStr) => new Date(dateStr));
    return datesArray;
  };

  const fetchRequestsListDateRange = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(
        `${baseUrl}/adminPanel/replacements/requests/requestsListDateRange`,
        { headers },
      );
      requestsList.value = response.data.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch data.";
    } finally {
      loading.value = false;
    }
  };

  const approveSubstitution = async (id: number) => {
    try {
      await axios.post(
        `${baseUrl}/adminPanel/replacements/requests/${id}/confirm`,
        {},
        { headers },
      );
      fetchRequestsListDateRange();
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Failed to approe substitution";
    }
  };

  const rejectSubstitution = async (id: number) => {
    try {
      await axios.post(
        `${baseUrl}/adminPanel/replacements/requests/${id}/reject`,
        {},
        { headers },
      );
      fetchRequestsListDateRange();
    } catch (err: any) {
      error.value = err.response?.data?.message || "";
    }
  };

  return {
    requestsList,
    loading,
    error,
    formattedList,
    highlights,
    fetchRequestsListDateRange,
    approveSubstitution,
    rejectSubstitution,
  };
});
