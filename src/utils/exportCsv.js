/**
 * HOUSE OF HUMOUR (HoH) - CSV Export Utility
 */

export const exportApplicationsToCSV = (applications = []) => {
  if (!applications || !applications.length) {
    alert('No applications available to export.');
    return;
  }

  const headers = ['ID', 'Name', 'City', 'Phone', 'Email', 'Age', 'Experience', 'Video Link', 'Status', 'Applied At'];
  
  const escapeCell = (text) => {
    if (text === null || text === undefined) return '""';
    const str = String(text).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = applications.map(app => [
    escapeCell(app.id),
    escapeCell(app.name),
    escapeCell(app.city),
    escapeCell(app.phone),
    escapeCell(app.email),
    escapeCell(app.age),
    escapeCell(app.exp || app.comedyExperience),
    escapeCell(app.tape || app.performanceVideo),
    escapeCell(app.status),
    escapeCell(app.timestamp)
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `hoh_contestant_applications_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
