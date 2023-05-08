import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }
  async function updateStateWithNewData(
    years,
    view,
    office,
    stateSettingCallback
  ) {
    //         _                                                                             _
    //       |                                                                                 |
    //       |   Example request for once the `/summary` endpoint is up and running:           |
    //       |                                                                                 |
    //       |     `${url}/summary?to=2022&from=2015&office=ZLA`                               |
    //       |                                                                                 |
    //       |     so in axios we will say:                                                    |
    //       |                                                                                 |
    //       |       axios.get(`${url}/summary`, {                                             |
    //       |         params: {                                                               |
    //       |           from: <year_start>,                                                   |
    //       |           to: <year_end>,                                                       |
    //       |           office: <office>,       [ <-- this one is optional! when    ]         |
    //       |         },                        [ querying by `all offices` there's ]         |
    //       |       })                          [ no `office` param in the query    ]         |
    //       |                                                                                 |
    //         _                                                                             _
    //                                  -- Mack

    //   */

    if (office === 'all' || !office) {
      console.log(view);
      let data = [];
      try {
        const [fiscalRes, citizenshipRes] = await Promise.all([
          axios.get(
            'https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary'
          ),
          axios.get(
            'https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary'
          ),
        ]);

        const data = [fiscalRes.data, {}];

        data[0].citizenshipResults = citizenshipRes.data;

        console.log(data);
        stateSettingCallback(view, office, data);
      } catch (err) {
        console.log(err);
      }
      // switch (view){
      //   case ('time-series' ):
      //     await axios.get("https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary")
      //     .then(res => {
      //       data[0] = res.data;
      //       console.log(data[0]);
      //       stateSettingCallback(view, office, data);
      //       })
      //     .catch (err => {
      //       console.log(err);
      //     });
      //     case ('office-heat-map'):
      //     await axios.get("https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary")
      //     .then(res => {
      //       data[0] = res.data;
      //       console.log(data[0]);
      //       stateSettingCallback(view, office, data);
      //       })
      //     .catch (err => {
      //       console.log(err);
      //     });
      //   case 'citizenship':
      //     await axios.get("https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary")
      //     .then(res => {
      //       data[0].citizenshipResults = res.data;
      //       console.log(data[0]);
      //       stateSettingCallback(view, office, res.data);
      //     })
      //     .catch (err => {
      //       console.log(err);
      //     });
      // }
    } else {
      let data = [];
      switch (view) {
        case 'time-series' || 'office-heat-map':
          await axios
            .get('https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary', {
              params: {
                from: years[0],
                to: years[1],
                office: office,
              },
            })
            .then(res => {
              data[0] = res.data;
              stateSettingCallback(view, office, data);
            })
            .catch(err => {
              console.log(err);
            });
      }
      // axios
      //   .get("https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary", {
      //     // mock URL, can be simply replaced by `${Real_Production_URL}/summary` in prod!
      //     params: {
      //       from: years[0],
      //       to: years[1],
      //       office: office,
      //     },
      //   })
      //   .then(result => {
      //     console.log(result.data);
      //     stateSettingCallback(view, office, result.data); // <-- `test_data` here can be simply replaced by `result.data` in prod!
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
    }
  }
  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };
  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
