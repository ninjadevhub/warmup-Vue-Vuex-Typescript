<template>
  <v-container class="pr-0 pr-md-16" fluid>
    <v-row>
      <v-col cols="12" class="pt-0">
        <div class="metrics__title mb-0">
          <div class="font-weight-bold">john.smith@acme.com</div>
          <base-switch v-model="isRunning" class="d-inline-block py-0 mt-3" />
          <span v-if="isRunning" class="label label__running font-weight-bold">Running</span>
          <span v-else class="label label__paused font-weight-bold">Paused</span>
          <v-divider />
        </div>
      </v-col>
    </v-row>
    <v-row class="metrics__data data">
      <v-col class="pr-lg-10" cols="12" md="6" lg="4" >
        <div class="d-inline-block float-lg-left pr-4 pr-sm-10 pr-md-5 pr-lg-0">
          <div class="data__title">Sending</div>
          <v-divider class="mb-2 mt-1" />
          <div class="data__wrapper">
            <div class="data__value">5</div>
            <div class="data__info">Sent today</div>
          </div>
          <div class="data__wrapper">
            <div class="data__value">10</div>
            <div class="data__info">Sent last 7 days</div>
          </div>
          <div class="data__wrapper">
            <div class="data__value">300</div>
            <div class="data__info">Sent last 30 days</div>
          </div>
        </div>
        <div class="d-inline-block float-lg-right pl-0 pl-sm-10 pl-md-5 pl-lg-0">
          <div class="data__title">Receiving</div>
          <v-divider class="mb-2 mt-1" />
          <div class="data__wrapper">
            <div class="data__value">12</div>
            <div class="data__info">Sent today</div>
          </div>
          <div class="data__wrapper">
            <div class="data__value">30</div>
            <div class="data__info">Received last 7 days</div>
          </div>
          <div class="data__wrapper">
            <div class="data__value">712</div>
            <div class="data__info">Received last 30 days</div>
          </div>
        </div>
      </v-col>
      <v-col class="px-lg-10" cols="12" md="6" lg="4" >
        <div class="data__title">Inbox vs Spam</div>
        <v-divider class="mb-6 mt-1" />
        <div class="d-flex flex-column flex-sm-row justify-lg-space-between">
          <div class="data__doughnut-chart d-flex justify-center d-sm-block">
            <doughnut-chart :chart-data="doughnutChartData" :options="doughnutOptions" />
          </div>
          <div class="d-flex justify-space-between align-center mt-5 mt-sm-0 d-sm-block ml-10 ml-lg-0">
            <div class="data__doughnut-legend-inbox mb-sm-8 d-inline-block d-sm-block">
              <div class="data__doughnut-legend-inbox-title font-weight-bold">98.1% (591)</div>
              <div>Landed in <br /> Inbox</div>
            </div>
            <div class="data__doughnut-legend-spam d-inline-block d-sm-block">
              <div class="data__doughnut-legend-spam-title font-weight-bold">2.9% (11)</div>
              <div>Landed in <br /> Spam & Saved</div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col class="pl-lg-10" cols="12" lg="4" >
        <div class="data__title">Health Score</div>
        <v-divider class="mb-2 mt-1" />
        <div class="data__wrapper">
          <div class="data__value">0/0</div>
          <div class="data__info">
            Upgrade to see your score
          </div>
        </div>
        <div class="data__title">Listed On Any Blacklists</div>
        <v-divider class="mb-2 mt-1" />
        <div class="data__wrapper">
          <div class="data__value">?</div>
          <div class="data__info">
            Upgrade to see your score
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="metrics__data data">
      <v-col cols="12" class="pt-10">
        <div class="data__title">
          Inbox Activity
          <div class="float-right">
            <edit-schedule-modal />
          </div>
        </div>
        <v-divider class="mb-6 mt-1" />
        <v-row>
          <v-col cols="12" md="10">
            <bar-chart
              :chart-data="computedChartData"
              :options="barChartOptions"
              :height="100"
            />
          </v-col>
          <v-col cols="12" md="2">
            <div class="font-weight-bold mb-3">{{ currentDate }}, 2020</div>
            <div class="chart-legend d-flex align-center" @click="isScheduledVisible = !isScheduledVisible">
              <div class="chart-legend__icon">
                <base-icon
                  v-if="isScheduledVisible"
                  class="d-inline-block d-fle pl-0 pt-0 pb-0"
                >
                  mdi-check
                </base-icon>
              </div>
              <div class="chart-legend__wrapper scheduled d-inline-block">
                <div class="chart-legend__value">{{ currentScheduled }}</div>
                <div class="chart-legend__name">Scheduled</div>
              </div>
            </div>
            <div class="chart-legend d-flex align-center" @click="isLandedInInboxVixible = !isLandedInInboxVixible">
              <div class="chart-legend__icon">
                <base-icon
                  v-if="isLandedInInboxVixible"
                  class="d-inline-block d-fle pl-0 pt-0 pb-0"
                >
                  mdi-check
                </base-icon>
              </div>
              <div class="chart-legend__wrapper landed-inbox d-inline-block">
                <div class="chart-legend__value">{{ currentLandedInInbox }}</div>
                <div class="chart-legend__name">Landed in inbox</div>
              </div>
            </div>
            <div class="chart-legend d-flex align-center" @click="isLandedInSpamVisible = !isLandedInSpamVisible">
              <div class="chart-legend__icon">
                <base-icon
                  v-if="isLandedInSpamVisible"
                  class="d-inline-block d-fle pl-0 pt-0 pb-0"
                >
                  mdi-check
                </base-icon>
              </div>
              <div class="chart-legend__wrapper landed-spam d-inline-block">
                <div class="chart-legend__value">{{ currentLandedInSpam }}</div>
                <div class="chart-legend__name">Landed in <br /> Spam & Saved</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import EditScheduleModal from '@/components/modals/EditScheduleModal.vue'

@Component({ components: { DoughnutChart, BarChart, EditScheduleModal } })
export default class InboxMetrics extends Vue {
  isRunning = false // TODO: need computed getter?
  isScheduledVisible = true;
  isLandedInInboxVixible = true
  isLandedInSpamVisible = true
  currentIndex = 0

  doughnutChartData = {
    labels: ['Inbox', 'Spam'],
    datasets: [
      {
        data: [98.1, 2.9],
        backgroundColor: [
          '#9BCAA0',
          '#E19695'
        ],
        borderColor: [
          '#9BCAA0',
          '#E19695'
        ],
        borderWidth: 1
      }
    ]
  }

  doughnutOptions = {
    legend: false,
    tooltips: {
      mode: 'label',
      callbacks: {
        // eslint-disable-next-line
        label: function (tooltipItem: any, data: any) {
          const dataset = data.datasets[tooltipItem.datasetIndex]
          const value = dataset.data[tooltipItem.index]
          const label = data.labels[tooltipItem.index]
          return `${label} (${value} %)`
        }
      }
    }
  }

  barChartData = {
    labels: [
      'Nov 5', 'Nov 6', 'Nov 7', 'Nov 8', 'Nov 9', 'Nov 10', 'Nov 11', 'Nov 12', 'Nov 13',
      'Nov 14', 'Nov 15', 'Nov 16', 'Nov 17', 'Nov 18', 'Nov 19', 'Nov 20', 'Nov 21'
    ],
    datasets: [
      {
        label: ['Inboxes'],
        backgroundColor: '#9BCAA0',
        data: [...Array(17)].map(() => Math.floor(Math.random() * 9))
      },
      {
        label: ['Spam'],
        backgroundColor: '#E19695',
        data: [...Array(17)].map(() => Math.floor(Math.random() * 9))
      },
      {
        label: ['Scheduled'],
        backgroundColor: '#303234',
        data: [...Array(17)].map(() => Math.floor(Math.random() * 9))
      }
    ]
  }

  barChartOptions = {
    legend: false,
    tooltips: {
      enabled: false
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          stacked: true
        }
      ]
    },
    hover: {
      // eslint-disable-next-line
      onHover: (self: Chart, event: any) => {
        if (event && event[0]) this.changeCurrentIndex(event[0]._index)
      }
    }
  }

  get computedChartData () {
    const newChartData = { labels: this.barChartData.labels, datasets: [] }
    if (this.isLandedInInboxVixible) newChartData.datasets.push(this.barChartData.datasets[0] as never)
    if (this.isLandedInSpamVisible) newChartData.datasets.push(this.barChartData.datasets[1] as never)
    if (this.isScheduledVisible) newChartData.datasets.push(this.barChartData.datasets[2] as never)

    return newChartData
  }

  get currentDate (): string {
    return this.barChartData.labels[this.currentIndex] ? this.barChartData.labels[this.currentIndex] : '-'
  }

  get currentLandedInInbox (): number | string {
    return this.barChartData.datasets[0].data[this.currentIndex]
      ? this.barChartData.datasets[0].data[this.currentIndex]
      : '0'
  }

  get currentLandedInSpam (): number | string {
    return this.barChartData.datasets[1].data[this.currentIndex]
      ? this.barChartData.datasets[1].data[this.currentIndex]
      : '0'
  }

  get currentScheduled (): number | string {
    return this.barChartData.datasets[2].data[this.currentIndex]
      ? this.barChartData.datasets[2].data[this.currentIndex]
      : '0'
  }

  changeCurrentIndex (index: number): void {
    this.currentIndex = index
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep {
    #doughnut-chart {
      max-width: 150px;
      max-height: 150px;
      width: min-content;
    }
  }

  .chart-legend {
    padding: 8px 12px;
    border-radius: 3px;
    border: 1px solid transparent;
    &:hover {
      background-color: #E6E6E8;
      border: 1px solid #979797;
      cursor: pointer;
    }
    &__wrapper {
      border-left: 6px solid;
      padding-left: 10px;
      &.shceduled {
        border-color: $color-shark;
      }
      &.landed-spam {
        border-color: $color-petit-orchid;
      }
      &.landed-inbox {
        border-color: $color-spring-rain;
      }
    }
    &__icon {
      min-width: 44px;
    }
    &__value {
      font-weight: $font-weight-bold;
    }
    &__name {
      font-size: 12px;
    }
  }

  .metrics {
    &__title {
      font-family: $label-font;
      font-size: $font-md-x;
      width: 100%;
      .label {
        font-size: 15px;
        &__running {
          color: $color-mountain-meadow;
        }
        &__paused {
          color: $color-french-gray
        }
      }
    }
    &__data {
      font-family: $label-font;
      .data {
        &__wrapper {
          margin-bottom: 10px;
        }
        &__title {
          font-weight: $font-weight-bold;
          font-size: $font-md-x;
        }
        &__value {
          font-weight: $font-weight-bold;
          font-size: $font-lg;
        }
        &__doughnut-legend {
          &-inbox {
            padding-left: 10px;
            border-left: 6px solid $color-spring-rain;
            &-title {
              color: $color-spring-rain;
            }
          }
          &-spam {
            padding-left: 10px;
            border-left: 6px solid $color-petit-orchid;
            &-title {
              color: $color-petit-orchid;
            }
          }
        }
      }
    }
  }
</style>
