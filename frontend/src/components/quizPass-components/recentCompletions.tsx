export function RecentCompletions() {
  return (
    <div>
      <div>
        <h1>Recent Completions</h1>
        <p>Students who recently completed this quiz</p>
      </div>
      <div className="border border-gray-600 rounded-lg">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="border border-gray-600 rounded-lg">{
            }</tbody>
        </table>
      </div>
    </div>
  );
}
