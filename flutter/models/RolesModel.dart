
class Roles{
    final String id;
    final String roleName;
		final String status;
		final String createdByID;
		final String updatedByID;
    
    const Roles({
        required this.id,
        required this.roleName,
				required this.status,
				required this.createdByID,
				required this.updatedByID
    });
    
    factory Roles.fromJson(Map<String, dynamic> json) => Roles(
        id: json['_id'],
        roleName: json['roleName'],
				status: json['status'],
				createdByID: json['createdByID'],
				updatedByID: json['updatedByID']
    );

    Map<String, dynamic> toJson() => {
        '_id': id,
        'roleName': roleName,
				'status': status,
				'createdByID': createdByID,
				'updatedByID': updatedByID
        // if a list
        // "list": List<dynamic>.from(list.map((x) => x.toJson())),
    };
}