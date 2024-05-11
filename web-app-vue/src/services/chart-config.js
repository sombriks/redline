// vue-data-ui charts configs https://vue-data-ui.graphieros.com/chart-builder

export const sparkBarConfig = {
  'style': {
    'backgroundColor': '#212121',
    'fontFamily': 'inherit',
    'layout': {
      'percentage': true,
      'target': 0
    },
    'gutter': {
      'backgroundColor': '#000000',
      'opacity': 100
    },
    'bar': {
      'gradient': {
        'show': true,
        'intensity': 80,
        'underlayerColor': '#000000'
      }
    },
    'gap': 4,
    'animation': {
      'show': true,
      'animationFrames': 60
    },
    'labels': {
      'fontSize': 16,
      'name': {
        'position': 'top',
        'width': '100%',
        'color': '#d5d5d5',
        'bold': true
      },
      'value': {
        'show': false,
        'bold': true
      }
    }
  }
}

export const donutConfig = {
  'useCssAnimation': true,
  'useBlurOnHover': true,
  'style': {
    'fontFamily': 'inherit',
    'chart': {
      'useGradient': true,
      'gradientIntensity': 40,
      'backgroundColor': '#212121',
      'color': '#d5d5d5',
      'layout': {
        'labels': {
          'dataLabels': {
            'show': true,
            'hideUnderValue': 3,
            'prefix': '',
            'suffix': ''
          },
          'value': {
            'show': true,
            'rounding': 0
          },
          'percentage': {
            'color': '#d5d5d5',
            'bold': true,
            'fontSize': 18
          },
          'name': {
            'color': '#d5d5d5',
            'bold': false,
            'fontSize': 14
          },
          'hollow': {
            'total': {
              'show': true,
              'bold': false,
              'fontSize': 18,
              'color': '#d5d5d5',
              'text': 'Total',
              'offsetY': 0,
              'value': {
                'color': '#d5d5d5',
                'fontSize': 18,
                'bold': true,
                'prefix': '',
                'suffix': '',
                'offsetY': 0,
                'rounding': 0
              }
            },
            'average': {
              'show': true,
              'bold': false,
              'color': '#d5d5d5',
              'fontSize': 18,
              'text': 'Average',
              'offsetY': 0,
              'value': {
                'color': '#d5d5d5',
                'fontSize': 18,
                'bold': true,
                'prefix': '',
                'suffix': '',
                'offsetY': 0,
                'rounding': 0
              }
            }
          }
        },
        'donut': {
          'strokeWidth': 64,
          'borderWidth': 1
        }
      },
      'legend': {
        'show': true,
        'backgroundColor': '#212121',
        'color': '#d5d5d5',
        'fontSize': 16,
        'bold': false,
        'roundingValue': 0,
        'roundingPercentage': 0
      },
      'title': {
        'text': '',
        'color': '#d5d5d5',
        'fontSize': 20,
        'bold': true,
        'subtitle': {
          'text': '',
          'color': '#d5d5d5',
          'fontSize': 16,
          'bold': false
        }
      },
      'tooltip': {
        'show': true,
        'backgroundColor': '#212121',
        'color': '#d5d5d5',
        'fontSize': 14,
        'showValue': true,
        'roundingValue': 0,
        'showPercentage': true,
        'roundingPercentage': 0
      }
    }
  },
  'userOptions': {
    'show': true
  },
  'table': {
    'show': false,
    'responsiveBreakpoint': 400,
    'columnNames': {
      'series': 'Series',
      'value': 'Value',
      'percentage': 'Percentage'
    },
    'th': {
      'backgroundColor': '#212121',
      'color': '#d5d5d5',
      'outline': 'none'
    },
    'td': {
      'backgroundColor': '#212121',
      'color': '#d5d5d5',
      'outline': 'none',
      'roundingValue': 0,
      'roundingPercentage': 0
    }
  }
}

export const sparkStackBarConfig = {
  'style': {
    'backgroundColor': '#212121',
    'fontFamily': 'inherit',
    'bar': {
      'gradient': {
        'show': true,
        'intensity': 40,
        'underlayerColor': '#d5d5d5'
      }
    },
    'animation': {
      'show': true,
      'animationFrames': 60
    },
    'legend': {
      'show': true,
      'textAlign': 'left',
      'fontSize': 12,
      'margin': '6px 0 0 0',
      'name': {
        'color': '#d5d5d5',
        'bold': false
      },
      'value': {
        'show': true,
        'color': '#d5d5d5',
        'rounding': 0,
        'prefix': '',
        'suffix': ''
      },
      'percentage': {
        'show': true,
        'color': '#d5d5d5',
        'rounding': 1,
        'bold': true
      }
    },
    'title': {
      'text': '',
      'textAlign': 'left',
      'color': '#d5d5d5',
      'fontSize': 16,
      'margin': '0 0 6px 0',
      'bold': true,
      'subtitle': {
        'text': '',
        'color': '#d5d5d5',
        'fontSize': 12,
        'bold': false
      }
    }
  }
}



