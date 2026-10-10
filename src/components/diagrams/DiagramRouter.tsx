import React from 'react';
import { DiagramParams, DiagramType } from '../../types';
import { PythagorasDiagram } from './PythagorasDiagram';
import { CircleSectorDiagram } from './CircleSectorDiagram';
import { FractionPieDiagram } from './FractionPieDiagram';
import { LinearFunctionDiagram } from './LinearFunctionDiagram';
import { QuadraticFunctionDiagram } from './QuadraticFunctionDiagram';
import { TrigonometryDiagram } from './TrigonometryDiagram';
import { ProbabilitySpinnerDiagram } from './ProbabilitySpinnerDiagram';
import { ScaleBalanceDiagram } from './ScaleBalanceDiagram';
import { AngleGeometryDiagram } from './AngleGeometryDiagram';
import { AreaPerimeterDiagram } from './AreaPerimeterDiagram';

interface Props {
  type: DiagramType;
  params: DiagramParams;
  spinnerRotation?: number;
  isSpinning?: boolean;
}

export const DiagramRouter: React.FC<Props> = ({
  type,
  params,
  spinnerRotation = 0,
  isSpinning = false,
}) => {
  switch (type) {
    case 'pythagoras':
      return <PythagorasDiagram params={params} />;
    case 'circle_sector':
      return <CircleSectorDiagram params={params} />;
    case 'fraction_pie':
      return <FractionPieDiagram params={params} />;
    case 'linear_function':
      return <LinearFunctionDiagram params={params} />;
    case 'quadratic_function':
      return <QuadraticFunctionDiagram params={params} />;
    case 'trigonometry_elevation':
      return <TrigonometryDiagram params={params} />;
    case 'probability_spinner':
      return (
        <ProbabilitySpinnerDiagram
          params={params}
          currentRotation={spinnerRotation}
          isSpinning={isSpinning}
        />
      );
    case 'scale_balance':
      return <ScaleBalanceDiagram params={params} />;
    case 'angle_geometry':
      return <AngleGeometryDiagram params={params} />;
    case 'area_perimeter':
      return <AreaPerimeterDiagram params={params} />;
    default:
      return <PythagorasDiagram params={params} />;
  }
};
