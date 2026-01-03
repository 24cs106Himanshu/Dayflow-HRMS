import React from 'react';

const sections = [
  {
    title: 'Scope',
    items: [
      'Secure authentication (Sign Up / Sign In)',
      'Role-based access (Admin/HR vs Employee)',
      'Employee profile management',
      'Attendance tracking (daily/weekly/monthly)',
      'Leave and time-off management with approvals',
      'Payroll visibility and admin controls',
    ],
  },
  {
    title: 'Functional',
    items: [
      'Auth: register with employeeId/email/password/role; email verification; strong password policy; JWT + refresh tokens; password reset; rate limiting and lockout after repeated failures.',
      'Roles: Employee vs Admin/HR (future Manager); employees see only their data; Admin/HR full CRUD and approvals.',
      'Dashboards: employee quick cards; admin widgets for leaves, attendance exceptions, employee list, payroll status.',
      'Profiles: view personal/job/payroll/document data; employees edit contact/address/avatar; Admin/HR edit all; audit changes.',
      'Attendance: check-in/out, auto status, filters, admin overrides with reason/audit; holidays/weekends support.',
      'Leave: configurable types, balance checks, overlap validation, workflow with comments, cancellation rules, notifications.',
      'Payroll: employee read-only payslip; Admin/HR create/update, attach payslip, lock after release; audit edits.',
      'Approvals: Admin/HR (optional manager tier), SLA targets, reminders.',
      'Documents: upload/download with type/size validation; metadata; soft-delete with retention.',
      'Search/Filters: global employee search; filters on attendance/leave/payroll.',
      'Notifications: email for verification, password reset, leave status; optional in-app toasts/badges.',
    ],
  },
  {
    title: 'Non-Functional',
    items: [
      'Security: HTTPS, JWT, bcrypt hashing, input validation/sanitization, restricted CORS, rate limiting.',
      'Availability: ~99.5% uptime goal; graceful shutdown; health check /health.',
      'Performance: P99 < 800ms for core APIs; pagination on lists.',
      'Scalability: stateless API, horizontal-ready; external file/object storage for documents.',
      'Reliability: daily backups; point-in-time restore; audit trails on critical changes.',
      'Maintainability: lint/format; env-driven config; feature flags.',
      'Observability: structured logs, error tracking, metrics (requests, latency, errors).',
    ],
  },
];

const Requirements = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Dayflow HRMS Requirements</h1>
        <p>A concise view of scope, functional, and non-functional requirements.</p>
      </div>
      <div style={styles.grid}>
        {sections.map((section) => (
          <div key={section.title} style={styles.card}>
            <h2 style={styles.cardTitle}>{section.title}</h2>
            <ul style={styles.list}>
              {section.items.map((item, idx) => (
                <li key={idx} style={styles.listItem}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '24px',
  },
  grid: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  cardTitle: {
    marginBottom: '12px',
  },
  list: {
    listStyle: 'disc',
    paddingLeft: '18px',
    margin: 0,
  },
  listItem: {
    marginBottom: '8px',
    color: '#444',
    lineHeight: 1.4,
  },
};

export default Requirements;
