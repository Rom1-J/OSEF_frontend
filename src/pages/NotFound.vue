<template>
  <div class="surface-0 flex align-items-center justify-content-center
  min-h-screen min-w-screen overflow-hidden">
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
      <div class="col-12 mt-5 xl:mt-0 text-center">
        <img src="@/layout/images/OSEF-logo.png" alt="OSEF logo" class="mb-5"
             style="height:60px;">
      </div>
      <div class="col-12 xl:col-6 customBorder">
        <div class="flex justify-content-center h-full w-full m-0 py-7 px-4 customBorder_filler">
          <div class="grid flex-column align-items-center">
            <span class="text-blue-500 font-bold text-3xl">404</span>
            <h1 class="text-900 font-bold text-center text-3xl lg:text-5xl mb-2">
              {{ $t('pages.notFound.title') }}
            </h1>
            <span class="text-gray-600">
              {{ $t('pages.notFound.description') }}
            </span>
            <div class="col-12 mt-8 text-center">
              <i class="pi pi-fw pi-arrow-left text-blue-500 mr-2"
                 style="vertical-align:center;"></i>
              <router-link to="/" class="text-blue-500">
                {{ $t('pages.notFound.goto') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.customBorder {
  border-radius:56px;
  padding:0.3rem;
  background: linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%);

  .customBorder_filler {
    border-radius:53px;
    background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));
  }
}
</style>
