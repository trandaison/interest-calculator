<template>
  <div id="results" class="overflow-x-auto">
    <div
      class="min-w-screen min-h-screen flex flex-col items-center justify-center font-sans overflow-hidden"
    >
      <div class="w-full lg:w-1/2">
        <div class="bg-gray-800 text-gray-500 shadow-md rounded my-6">
          <table class="min-w-max w-full table-auto text-right">
            <tr class="text-sm leading-normal hover:bg-gray-700">
              <th
                class="border-t-2 border-gray-900 text-lg font-semibold leading-tight w-64 uppercase py-4 px-6"
              >
                Số tiền vay
              </th>
              <td
                class="border-t-2 border-gray-900 text-lg font-semibold leading-tight py-4 px-6 font-mono text-white"
              >
                {{ depositeAmount | thousandsSeparator }}
              </td>
            </tr>
            <tr class="text-sm leading-normal hover:bg-gray-700">
              <th
                class="border-t-2 border-gray-900 text-lg font-semibold leading-tight w-64 uppercase py-4 px-6"
              >
                Số tiền lãi
              </th>
              <td
                class="border-t-2 border-gray-900 text-lg font-semibold leading-tight py-4 px-6 font-mono text-white"
              >
                {{ totalInterestAmount | thousandsSeparator }}
              </td>
            </tr>
            <tr class="text-sm leading-normal hover:bg-gray-700">
              <th
                class="border-t-2 border-gray-900 text-lg font-semibold leading-tight w-64 uppercase py-4 px-6"
              >
                Tổng gốc + lãi
              </th>
              <td
                class="border-t-2 border-gray-900 text-lg font-semibold leading-tight py-4 px-6 font-mono text-white"
              >
                {{ totalAmount | thousandsSeparator }}
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="w-full lg:w-5/6">
        <div
          class="border-2 border-gray-800 bg-gray-800 shadow-md rounded my-6 overflow-y-auto scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch lg:max-h-max min-h-40"
        >
          <table class="min-w-max w-full table-auto border-collapse">
            <thead>
              <tr class="uppercase text-sm leading-normal">
                <th
                  class="bg-gray-900 text-gray-600 z-20 sticky top-0 py-3 px-6 text-center"
                >
                  Tháng thứ
                </th>
                <th
                  class="bg-gray-900 text-gray-600 z-20 sticky top-0 py-3 px-6 text-center"
                >
                  Ngày
                </th>
                <th
                  class="bg-gray-900 text-gray-600 z-20 sticky top-0 py-3 px-6 text-center"
                >
                  Tiền gốc còn lại
                </th>
                <th
                  class="bg-gray-900 text-gray-600 z-20 sticky top-0 py-3 px-6 text-center"
                >
                  Tiền nợ gốc
                </th>
                <th
                  class="bg-gray-900 text-gray-600 z-20 sticky top-0 py-3 px-6 text-center"
                >
                  Tiền lãi
                </th>
                <th
                  class="bg-gray-900 text-gray-600 z-20 sticky top-0 py-3 px-6 text-center"
                >
                  Tổng gốc + lãi
                </th>
              </tr>
            </thead>
            <tbody class="text-gray-800 text-sm font-light font-mono">
              <tr class="border-b border-gray-900 bg-gray-800 text-gray-600">
                <td class="py-3 px-6 text-right">0</td>
                <td class="py-3 px-6 text-right">{{ disbursementDate }}</td>
                <td class="py-3 px-6 text-right">
                  {{ depositeAmount | thousandsSeparator }}
                </td>
                <td class="py-3 px-6 text-right"></td>
                <td class="py-3 px-6 text-right"></td>
                <td class="py-3 px-6 text-right"></td>
              </tr>
              <tr
                v-for="(month, index) in months"
                :key="index"
                class="border-b border-gray-900 hover:bg-gray-800 bg-gray-800"
                :class="month.isDiscount ? 'text-blue-300' : 'text-gray-400'"
              >
                <td class="py-3 px-6 text-right">{{ index + 1 }}</td>
                <td class="py-3 px-6 text-right">
                  {{ month.date }}
                </td>
                <td class="py-3 px-6 text-right">
                  {{ month.remainningAmount | thousandsSeparator }}
                </td>
                <td class="py-3 px-6 text-right">
                  {{ month.monthlyAmount | thousandsSeparator }}
                </td>
                <td class="py-3 px-6 text-right">
                  {{ month.monthlyInterest | thousandsSeparator }}
                </td>
                <td class="py-3 px-6 text-right">
                  {{ month.monthlyTotal | thousandsSeparator }}
                </td>
              </tr>
              <tr class="uppercase bg-gray-900 text-white">
                <td class="py-3 px-6 text-right"></td>
                <td class="py-3 px-6 text-right"></td>
                <td class="py-3 px-6 text-right"></td>
                <td class="py-3 px-6 text-right font-bold font-sans">Tổng</td>
                <td class="py-3 px-6 text-right font-bold font-mono">
                  {{ totalInterestAmount | thousandsSeparator }}
                </td>
                <td class="py-3 px-6 text-right font-bold font-mono">
                  {{ totalAmount | thousandsSeparator }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { thousandsSeparator } from '@/utils/number'

@Component({
  name: 'ResultTable',
  filters: { thousandsSeparator },
})
export default class Home extends Vue {
  @Prop()
  private readonly months!: Array<any>

  @Prop()
  private readonly depositeAmount!: number

  @Prop()
  private readonly disbursementDate!: string

  get totalInterestAmount() {
    return this.months.reduce(
      (total, item) => (total += item.monthlyInterest),
      0
    )
  }

  get totalAmount() {
    return this.months.reduce((total, item) => (total += item.monthlyTotal), 0)
  }
}
</script>

<style scoped>
.min-h-40 {
  min-height: 10rem;
}

@media (min-width: 1024px) {
  .lg\:max-h-max {
    max-height: calc(100vh - 230px);
  }
}
</style>
