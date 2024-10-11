import random
import requests
from datetime import datetime, timedelta

def generate_property_data():
    owners = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown']
    property_names = ['Sunny Apartments', 'Downtown Condos', 'Lakeside Villas', 'Mountain Retreats']

    for owner in owners:
        for name in property_names:
            total_units = random.randint(50, 200)
            filled_units = random.randint(0, total_units)
            vacant_units = total_units - filled_units
            occupancy_rate = (filled_units / total_units) * 100
            last_maintenance_date = datetime.now() - timedelta(days=random.randint(1, 365))

            property_data = {
                'owner_name': owner,
                'property_name': name,
                'total_units': total_units,
                'filled_units': filled_units,
                'vacant_units': vacant_units,
                'occupancy_rate': round(occupancy_rate, 2),
                'last_maintenance_date': last_maintenance_date.strftime('%Y-%m-%d')
            }

            # Send data to the Node.js API
            response = requests.post('http://localhost:3000/api/properties', json=property_data)
            print(response.json())

if __name__ == '__main__':
    generate_property_data()
