
class Quizcategory{
    final String id;
    final String name;
		final String description;
		final String status;
		final String createdByID;
		final String updatedByID;
    
    const Quizcategory({
        required this.id,
        required this.name,
				required this.description,
				required this.status,
				required this.createdByID,
				required this.updatedByID
    });
    
    factory Quizcategory.fromJson(Map<String, dynamic> json) => Quizcategory(
        id: json['_id'],
        name: json['name'],
				description: json['description'],
				status: json['status'],
				createdByID: json['createdByID'],
				updatedByID: json['updatedByID']
    );

    Map<String, dynamic> toJson() => {
        '_id': id,
        'name': name,
				'description': description,
				'status': status,
				'createdByID': createdByID,
				'updatedByID': updatedByID
        // if a list
        // "list": List<dynamic>.from(list.map((x) => x.toJson())),
    };
}