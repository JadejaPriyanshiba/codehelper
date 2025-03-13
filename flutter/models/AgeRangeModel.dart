
class Agerange{
    final String id;
    final String identifier;
		final int minAge;
		final int maxAge;
		final String status;
		final String createdByID;
		final String updatedByID;
    
    const Agerange({
        required this.id,
        required this.identifier,
				required this.minAge,
				required this.maxAge,
				required this.status,
				required this.createdByID,
				required this.updatedByID
    });
    
    factory Agerange.fromJson(Map<String, dynamic> json) => Agerange(
        id: json['_id'],
        identifier: json['identifier'],
				minAge: json['minAge'],
				maxAge: json['maxAge'],
				status: json['status'],
				createdByID: json['createdByID'],
				updatedByID: json['updatedByID']
    );

    Map<String, dynamic> toJson() => {
        '_id': id,
        'identifier': identifier,
				'minAge': minAge,
				'maxAge': maxAge,
				'status': status,
				'createdByID': createdByID,
				'updatedByID': updatedByID
        // if a list
        // "list": List<dynamic>.from(list.map((x) => x.toJson())),
    };
}