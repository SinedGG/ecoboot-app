<template>
    <div class="pagination">
        <button class="custom-button" @click="selectPage(currentPage - 1)" :disabled="currentPage === 1">
            Назад
        </button>
        <button class="custom-button" v-for="page in visiblePages" :key="page" @click="selectPage(page)"
            :class="{ active: currentPage === page }">
            {{ page }}
        </button>
        <button class="custom-button" @click="selectPage(currentPage + 1)" :disabled="currentPage === totalPages">
            Далі
        </button>
    </div>
</template>
  
<script>
export default {
    props: {
        currentPage: Number,
        totalPages: Number,
        visiblePageCount: {
            type: Number,
            default: 5,
        },
    },
    computed: {
        visiblePages() {
            const start = Math.max(1, this.currentPage - Math.floor(this.visiblePageCount / 2));
            const end = Math.min(this.totalPages, start + this.visiblePageCount - 1);

            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },
    },
    methods: {
        selectPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.$emit("pageSelected", page);
            }
        },
    },
};
</script>
  
<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.custom-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin: 5px;
}

.custom-button.active {
    background-color: #0056b3;
}

.custom-button:hover {
    background-color: #0056b3;
}
</style>
  