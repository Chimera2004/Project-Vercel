import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AppointmentsView() {
  const appointments = [
    { id: 1, patient: "John Doe", doctor: "Dr. Smith", date: "2025-10-22", time: "10:00 AM", status: "Scheduled" },
    { id: 2, patient: "Jane Smith", doctor: "Dr. Wilson", date: "2025-10-22", time: "11:30 AM", status: "Scheduled" },
    { id: 3, patient: "Mike Johnson", doctor: "Dr. Brown", date: "2025-10-23", time: "2:00 PM", status: "Pending" },
  ]

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 px-4 font-medium">Patient</th>
                <th className="text-left py-2 px-4 font-medium">Doctor</th>
                <th className="text-left py-2 px-4 font-medium">Date</th>
                <th className="text-left py-2 px-4 font-medium">Time</th>
                <th className="text-left py-2 px-4 font-medium">Status</th>
                <th className="text-left py-2 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt.id} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3 px-4">{apt.patient}</td>
                  <td className="py-3 px-4">{apt.doctor}</td>
                  <td className="py-3 px-4">{apt.date}</td>
                  <td className="py-3 px-4">{apt.time}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${apt.status === "Scheduled" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {apt.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm" className="mr-2 bg-transparent">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
