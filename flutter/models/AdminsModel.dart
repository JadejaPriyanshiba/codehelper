
class Admins{
    final String id;
    final String firstName;
		final String lastName;
		final String status;
    
    const Admins({
        required this.id,
        required this.firstName,
				required this.lastName,
				required this.status
    });
    
    factory Admins.fromJson(Map<String, dynamic> json) => Admins(
        id: json['_id'],
        firstName: json['firstName'],
				lastName: json['lastName'],
				status: json['status']
    );

    Map<String, dynamic> toJson() => {
        '_id': id,
        'firstName': firstName,
				'lastName': lastName,
				'status': status
        // if a list
        // "list": List<dynamic>.from(list.map((x) => x.toJson())),
    };
}