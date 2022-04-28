<template>
  <div class="table-skeleton">
    <table>
      <thead></thead>
      <tbody>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
  .table-skeleton {
    @apply border rounded;

    table {
      @apply w-full;

      thead {
        @apply bg-gray-300 animate-pulse h-10 w-full flex;
      }

      tbody {
        @apply h-auto divide-y divide-gray-300;

        tr {
          @apply flex bg-gray-100 h-10 w-full animate-pulse;
        }
      }
    }
  }
</style>
