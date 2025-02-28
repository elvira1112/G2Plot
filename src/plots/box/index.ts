import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { Adaptor } from '../../core/adaptor';
import { BoxOptions } from './types';
import { adaptor } from './adaptor';
import { transformData } from './utils';
import { BOX_RANGE, BOX_RANGE_ALIAS, OUTLIERS_VIEW_ID } from './constant';
export type { BoxOptions };

export class Box extends Plot<BoxOptions> {
  /** 图表类型 */
  public type: string = 'box';

  /**
   * @override
   * @param data
   */
  public changeData(data) {
    this.updateOption({ data });
    const { yField } = this.options;

    const outliersView = this.chart.views.find((v) => v.id === OUTLIERS_VIEW_ID);
    if (outliersView) {
      outliersView.data(data);
    }

    this.chart.changeData(transformData(data, yField));
  }

  /**
   * 获取 箱型图 默认配置项
   */
  protected getDefaultOptions(): Partial<BoxOptions> {
    return deepAssign({}, super.getDefaultOptions(), {
      meta: {
        [BOX_RANGE]: { min: 0, alias: BOX_RANGE_ALIAS },
      },

      // 默认区域交互
      interactions: [{ type: 'active-region' }],

      // 默认 tooltips 共享，不显示 markers
      tooltip: {
        showMarkers: false,
        showCrosshairs: true,
        shared: true,
      },
    });
  }

  /**
   * 获取 箱型图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BoxOptions> {
    return adaptor;
  }
}
