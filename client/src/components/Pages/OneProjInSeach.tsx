import React from 'react';
import type { ProjectTypes } from '../../types';

type ProjectTypeProps = {
  project: ProjectTypes;
};

export default function OneProjInSeach({ project }: ProjectTypeProps): JSX.Element {
  return (
    <div
      className="card text-white mb-3"
      style={{
        maxWidth: '100%',
        marginTop: '20px',
        backgroundColor: 'rgba(38, 35, 100, 0.25)',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className="card-header">
        <a
          href={`/projects/${project.id}`}
          style={{ color: 'DarkSlateBlue', textDecoration: 'none' }}
        >
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
