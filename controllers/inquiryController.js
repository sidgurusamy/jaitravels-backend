const { sendInquiryEmail } = require("../utils/emailUtils");

const submitInquiryForm = async (req, res) => {
  try {
    const data = req.body;

    const {
      name,
      email,
      phone,
      enquiryFor,
      message,
      departureCity,
      arrivalCity,
      departureDate,
      returnDate,
      tripType,
      flightClass,
      numberOfFlyers,
      hotelCity,
      numberOfRooms,
      checkInDate,
      checkOutDate,
      pickUpLocation,
      dropOffLocation,
      pickUpDate,
      dropOffDate,
      carType,
      durationOfRental,
      insuranceFor,
      insuranceType,
      travelDate,
      numberOfTravelers,
      vacationType,
      destination
    } = data;

     if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required." });
    }

    let htmlContent = `
    <div style="font-family: 'Segoe UI', sans-serif; color: #333; padding: 20px;">
      <h2 style="color: primary; margin-bottom: 10px;">🧳 New Travel Enquiry from ${name}</h2>
      <table style="width: 100%; max-width: 600px; margin-bottom: 20px;">
        <tr><td style="padding: 5px 0;"><strong>Name:</strong></td><td>${name}</td></tr>
        <tr><td style="padding: 5px 0;"><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td style="padding: 5px 0;"><strong>Phone:</strong></td><td>${phone}</td></tr>
        <tr><td style="padding: 5px 0;"><strong>Services Selected:</strong></td><td>${enquiryFor.join(", ")}</td></tr>
      </table>
    `;

    if (enquiryFor.includes("Flight")) {
      htmlContent += `
        <h3 style="color: #fb4e2b;">✈️ Flight Details</h3>
        <ul>
          <li><strong>From:</strong> ${departureCity}</li>
          <li><strong>To:</strong> ${arrivalCity}</li>
          <li><strong>Departure:</strong> ${departureDate}</li>
          <li><strong>Return:</strong> ${returnDate || "N/A"}</li>
          <li><strong>Trip Type:</strong> ${tripType}</li>
          <li><strong>Class:</strong> ${flightClass}</li>
          <li><strong>Number of People:</strong> ${numberOfFlyers}</li>
        </ul>
      `;
    }

    if (enquiryFor.includes("Hotels")) {
      htmlContent += `
        <h3 style="color: #fb4e2b;">🏨 Hotel Booking</h3>
        <ul>
          <li><strong>City:</strong> ${hotelCity}</li>
          <li><strong>Rooms:</strong> ${numberOfRooms}</li>
          <li><strong>Check-in:</strong> ${checkInDate}</li>
          <li><strong>Check-out:</strong> ${checkOutDate}</li>
        </ul>
      `;
    }

    if (enquiryFor.includes("Car Rentals")) {
      htmlContent += `
        <h3 style="color: #fb4e2b;">🚗 Car Rental</h3>
        <ul>
          <li><strong>Pick-Up Location:</strong> ${pickUpLocation}</li>
          <li><strong>Drop-Off Location:</strong> ${dropOffLocation}</li>
          <li><strong>Pick-Up Date:</strong> ${pickUpDate}</li>
          <li><strong>Drop-Off Date:</strong> ${dropOffDate}</li>
          <li><strong>Car Type:</strong> ${carType}</li>
          <li><strong>Rental Duration:</strong> ${durationOfRental} days</li>
        </ul>
      `;
    }

    if (enquiryFor.includes("Travel Insurance")) {
      htmlContent += `
        <h3 style="color: #fb4e2b;">🛡️📃 Travel Insurance</h3>
        <ul>
          <li><strong>Insurance For:</strong> ${insuranceFor}</li>
          <li><strong>Insurance Type:</strong> ${insuranceType}</li>
        </ul>
      `;
    }

    if (enquiryFor.includes("Holiday Packages")) {
      htmlContent += `
        <h3 style="color: #fb4e2b;">🌴🏖️🌞 Holiday Package</h3>
        <ul>
                  <li><strong>Travel Date:</strong> ${travelDate}</li>
                            <li><strong>Destination:</strong> ${destination}</li>
          <li><strong>Vacation Type:</strong> ${vacationType}</li>
          <li><strong>Number of Travelers:</strong> ${numberOfTravelers}</li>
        </ul>
      `;
    }

    if (message) {
      htmlContent += `
        <h3 style="color: #fb4e2b;">💬 Additional Message</h3>
        <p style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid primary;">${message}</p>
      `;
    }else{
            htmlContent += `
        <h3 style="color: #fb4e2b;">💬 Additional Message</h3>
        <p style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid primary;">No Additional Requests or message</p>
      `;
    }

    htmlContent += `
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 0.9em; color: #888;">This enquiry was submitted from the JaiTravels website.</p>
    </div>
    `;

    await sendInquiryEmail("🧳 New Travel Enquiry", htmlContent, email);
    return res.status(200).json({ message: "Enquiry submitted successfully." });

  } catch (error) {
    console.error("Error handling enquiry form:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { submitInquiryForm };
