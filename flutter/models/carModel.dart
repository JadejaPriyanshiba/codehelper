
class Car{
    final String _id;
    final String model;
	final String companyID;
	final String OwnerID;
	final int number_plate
    
    const Car({
        required this._id,
        required this.model,
		required this.companyID,
		required this.OwnerID,
		required this.number_plate
    });
    
    factory Car.fromJson(Map<String, dynamic> json) => Car(
        _id: json['_id'],
        model: json['model'],
		companyID: json['companyID'],
		OwnerID: json['OwnerID'],
		number_plate: json['number_plate']
    );

    Map<String, dynamic> toJson() => {
        '_id': _id,
        'model': model,
		'companyID': companyID,
		'OwnerID': OwnerID,
		'number_plate': number_plate
        // if a list
        // "list": List<dynamic>.from(list.map((x) => x.toJson())),
    };
}