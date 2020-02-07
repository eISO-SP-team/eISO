import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface ApiUploadResult {
	url: string;
}
 
export interface UploadResult {
	name: string;
	type: string;
	size: number;
	url: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(public http: HttpClient) { 

  }

  public async uploadFile( file: File ) : Promise<UploadResult> {
 
		var result = await this.http
			.post<ApiUploadResult>(
				"http://deimos.preskubbs.com/eiso-storage/",
				file, // Send the File Blob as the POST body.
				{
					// NOTE: Because we are posting a Blob (File is a specialized Blob
					// object) as the POST body, we have to include the Content-Type
					// header. If we don't, the server will try to parse the body as
					// plain text.
					headers: {
						"Content-Type": file.type
					},
					params: {
						clientFilename: file.name,
						mimeType: file.type
					}
				}
			)
			.toPromise()
		;
 
		return({
			name: file.name,
			type: file.type,
			size: file.size,
			url: result.url
		});
 
	}
}
