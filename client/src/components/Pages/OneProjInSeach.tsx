import React from 'react';
import type { ProjectTypes } from '../../types';

type ProjectTypeProps = {
  project: ProjectTypes;
};

export default function OneProjInSeach({ project }: ProjectTypeProps): JSX.Element {
  return (
    <div
      className="card text-white bg-info mb-3"
      style={{ maxWidth: '40em', marginTop: '20px', opacity: '0.5' }}
    >
      <div className="card-header">
        <a href={`/projects/${project.id}`}>
          <h5> {project.name}</h5>
        </a>
      </div>
      <div className="card-body">
        <p className="card-title">Жанр: {project.genre}</p>
        <p className="card-text">Адрес проведения съемки: {project.address}</p>
      </div>
    </div>
  );
}
