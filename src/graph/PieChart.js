import React from 'react';
import { useSelector } from 'react-redux';

import FetchingData from '../../../components/loaders/FetchingData';

import ActiveLearnerPie from './ActiveLearnerPie';
import ActiveInstructorPie from './ActiveInstructorPie';

const ActivityPies = () => {
  const { learner_alias, instructor_alias } = useSelector((state) => state.ORG);

  const {
    totalInactiveLearners,
    totalActiveInstructors,
    totalInactiveInstructors,
    totalActiveLearners,
    fetchingLearnersCount,
    fetchingInstructorsCount,
  } = useSelector((state) => state.analytics);

  return (
    <div className="activity-pies pb-2">
      <div
        className="simple-cards-collection uk-child-width-1 uk-child-width-1-2@m uk-child-width-1-4@l uk-grid-small uk-grid-match"
        data-uk-grid
      >
        <div className="uk-width-1-2@m">
          <div
            className="graph-grid-child pie-chart-div"
          >
            <div className="chart-header">
              <div className="chart-title">
                <h3>
                  Active {learner_alias}s against In-active {learner_alias}s
                </h3>
              </div>
            </div>

            <div className="mt-2 mb-2">
              <div className="right-aligned-legend">
                <div id="pie-chart-legend"></div>
              </div>

              {fetchingLearnersCount ? (
                <FetchingData divHeight={'37vh'} />
              ) : (
                <ActiveLearnerPie
                  chartData={{
                    [`Active ${learner_alias}`]: totalActiveLearners,
                    [`In-active ${learner_alias}`]: totalInactiveLearners,
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="uk-width-1-2@m">
          <div
            className="graph-grid-child pie-chart-div"
          >
            <div className="chart-header">
              <div className="chart-title">
                <h3>
                  Active {instructor_alias}s against In-active{' '}
                  {instructor_alias}s
                </h3>
              </div>
            </div>

            <div className="mt-2 mb-2">
              <div className="right-aligned-legend">
                <div id="pie-chart-legend"></div>
              </div>

              {fetchingInstructorsCount ? (
                <FetchingData divHeight={'37vh'} />
              ) : (
                <ActiveInstructorPie
                  chartData={{
                    [`Active ${instructor_alias}`]: totalActiveInstructors,
                    [`In-active ${instructor_alias}`]: totalInactiveInstructors,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPies;
