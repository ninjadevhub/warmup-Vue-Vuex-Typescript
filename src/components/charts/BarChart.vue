<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import { Bar } from 'vue-chartjs'
import { ChartData, ChartOptions } from 'chart.js'

@Component
export default class BarChart extends Mixins(Bar) {
  @Prop({
    type: Object as () => ChartData,
    required: true
  })
  readonly chartData!: ChartData

  @Prop({
    type: Object as () => ChartOptions
  })
  readonly options?: ChartOptions

  mounted () {
    this.renderChart(this.chartData, this.options)
  }

  @Watch('chartData')
  onChartDataChange (chartData: ChartData) {
    this.renderChart(chartData, this.options)
  }
}
</script>
